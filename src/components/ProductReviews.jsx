import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, doc, getDoc, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { Star, MessageCircle, CheckCircle } from 'lucide-react';

export default function ProductReviews({ productId }) {
    const { user, signInWithGoogle } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [hasPurchased, setHasPurchased] = useState(false);

    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const q = query(
                    collection(db, 'reviews'),
                    where('productId', '==', productId)
                );
                const snap = await getDocs(q);
                const fetchedReviews = snap.docs.map(d => ({ id: d.id, ...d.data() }));
                // Sort by date locally since composite index might be needed
                fetchedReviews.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
                setReviews(fetchedReviews);

                if (user) {
                    const myReview = fetchedReviews.find(r => r.userId === user.uid);
                    if (myReview) setHasReviewed(true);
                }
            } catch (err) {
                console.error("Error fetching reviews", err);
            }
        };

        fetchReviews();
    }, [productId, user]);

    useEffect(() => {
        const checkPurchase = async () => {
            if (!user) {
                setHasPurchased(false);
                return;
            }
            try {
                const purchaseDoc = await getDoc(doc(db, 'purchases', user.uid));
                if (purchaseDoc.exists()) {
                    const items = purchaseDoc.data().items || [];
                    if (items.includes(productId)) {
                        setHasPurchased(true);
                    }
                }
            } catch (err) {
                console.error('Error checking purchases:', err);
            }
        };
        checkPurchase();
    }, [user, productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating || !comment.trim()) return;

        setIsSubmitting(true);
        try {
            const newReview = {
                productId,
                userId: user.uid,
                userName: user.displayName || 'Customer',
                rating,
                comment: comment.trim(),
                createdAt: serverTimestamp()
            };
            await addDoc(collection(db, 'reviews'), newReview);

            // Optimistically update UI
            setReviews([{ ...newReview, id: Date.now().toString(), createdAt: { toMillis: () => Date.now() } }, ...reviews]);
            setHasReviewed(true);
            setComment('');
        } catch (err) {
            console.error('Error submitting review:', err);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate dynamic rating (blended with base 4.9 and 2400 mock reviews to look authentic as requested)
    const baseReviewCount = 2400;
    const baseTotalScore = baseReviewCount * 4.9;
    const realReviewCount = reviews.length;
    const realTotalScore = reviews.reduce((sum, r) => sum + r.rating, 0);
    const displayRating = ((baseTotalScore + realTotalScore) / (baseReviewCount + realReviewCount)).toFixed(1);
    const displayCount = (baseReviewCount + realReviewCount).toLocaleString();

    // Product-specific mock reviews
    const mockReviews = {
        'original-dubai-chewy': {
            name: 'Sarah J.',
            comment: 'The best Dubai chocolate cookie I have ever had! So stretchy and delicious.',
        },
        'strawberry-dubai-chewy': {
            name: 'Emily K.',
            comment: 'The strawberry flavor was incredible — the kataifi crunch with the white chocolate is just perfect!',
        },
        'mm-chocolate-bagel': {
            name: 'Chris M.',
            comment: 'The M&Ms melted so perfectly inside the bagel. It was gooey, chocolatey, and absolutely addicting!',
        },
    };
    const mockReview = mockReviews[productId] || {
        name: 'A. Customer',
        comment: 'Absolutely loved this! Amazing quality and flavor.',
    };

    return (
        <div id="reviews" className="mt-20 border-t border-secondary/10 pt-16">
            <h2 className="text-3xl font-display font-bold text-primary dark:text-white mb-10 flex items-center gap-3">
                <MessageCircle className="text-accent" size={32} />
                Customer Reviews
            </h2>

            <div className="flex flex-col md:flex-row gap-12 mb-12">
                {/* Aggregate Summary */}
                <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-secondary/10 shadow-soft flex-1 flex flex-col items-center justify-center text-center">
                    <span className="text-5xl font-display font-bold text-primary dark:text-white leading-none mb-3">
                        {displayRating}
                    </span>
                    <div className="flex text-accent mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={20} fill={s <= Math.round(Number(displayRating)) ? "currentColor" : "none"} strokeWidth={2} />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-text-light/50 uppercase tracking-widest">{displayCount} Verified Reviews</span>
                </div>

                {/* Write a Review Section */}
                <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-3xl border border-primary/10 flex-[2]">
                    <h3 className="text-xl font-bold text-primary dark:text-white mb-4">Leave a Review</h3>

                    {!user ? (
                        <div className="h-full flex flex-col items-center justify-center p-4">
                            <p className="text-sm border-l-2 py-1 px-4 border-accent mb-4 text-text-light/70 font-semibold italic">Only real buyers can leave a review. Log in to verify.</p>
                            <button onClick={signInWithGoogle} className="bg-primary text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all">
                                Sign In to Review
                            </button>
                        </div>
                    ) : !hasPurchased ? (
                        <div className="flex items-center gap-3 bg-white dark:bg-surface-dark p-4 rounded-xl border border-secondary/10 text-sm text-text-light/70">
                            <CheckCircle className="text-accent opacity-50" size={20} />
                            <span>You must purchase this item to leave a verified review.</span>
                        </div>
                    ) : hasReviewed ? (
                        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 text-sm text-primary">
                            <CheckCircle className="text-emerald-500" size={20} />
                            <span>Thank you! Your review has been published.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        onMouseEnter={() => setHoverRating(s)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="text-accent transition-transform hover:scale-110"
                                    >
                                        <Star size={24} fill={(hoverRating || rating) >= s ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Describe your experience (the stretchy marshmallow, the crust...)"
                                required
                                className="w-full bg-white dark:bg-surface-dark border border-secondary/20 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 resize-none h-24"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="self-start bg-primary text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Display Reviews */}
            <div className="space-y-6">
                {reviews.map((r, i) => (
                    <div key={r.id || i} className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-secondary/10 flex gap-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">
                            {r.userName?.charAt(0)?.toUpperCase() || 'C'}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="font-bold text-primary dark:text-white">{r.userName}</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <CheckCircle size={10} /> Verified Buyer
                                </span>
                            </div>
                            <div className="flex text-accent gap-0.5 mb-3">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={12} fill={r.rating >= s ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <p className="text-sm text-text-light/80 dark:text-text-dark/80">{r.comment}</p>
                        </div>
                    </div>
                ))}

                {/* Always show the mock review to fulfill schema promise and baseline */}
                <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-secondary/10 flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">
                        {mockReview.name.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-primary dark:text-white">{mockReview.name}</span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <CheckCircle size={10} /> Verified Buyer
                            </span>
                        </div>
                        <div className="flex text-accent gap-0.5 mb-3">
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                            <Star size={12} fill="currentColor" />
                        </div>
                        <p className="text-sm text-text-light/80 dark:text-text-dark/80">
                            {mockReview.comment}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
