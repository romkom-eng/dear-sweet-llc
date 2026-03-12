import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <section className="relative h-[85vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    role="img"
                    aria-label="Close up of a gourmet chocolate lava cookie with gold leaf"
                    style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOvan23Bq1kOvJ-50I__r1himmRobHx4lm87TXJt3e4NkQQyOlexU55-RdY6nsW5_GhR9mXSQ9lXdjAJ9UxOQ_G1AoSkuC4gPD_3slfwcaLfMpGrd6o7riPs6dOCuHs9NUuyR_E3C44UlLZKsGHkQle-bL-AhrUVQV_iWAU_ZMt7EdiTsClX-Wg2cMalqyudk-eINjDmR3VgFIXedX3FqIe4OtZKTMXq4WURYldB7UK5xk4F8qQq-zrEeW-ADDlRNk8NvIjUxUoZE")' }}
                />
                <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
                    <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] opacity-90">Premium Artisanal</span>
                    <h2 className="font-serif max-w-4xl text-5xl font-light leading-tight md:text-7xl lg:text-8xl italic">
                        The Original <br />
                        <span className="font-bold not-italic font-display">Dubai</span> Experience
                    </h2>
                    <p className="mt-8 max-w-xl text-lg font-light leading-relaxed opacity-90 md:text-xl font-display">
                        Handcrafted luxury cookies packed with 100% real Dubai chocolate and an authentic, irreplaceable chewy center.
                    </p>
                    <div className="mt-12 flex flex-col gap-4 sm:flex-row font-display">
                        <NavLink
                            to="/menu"
                            className="min-w-[180px] rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 hover:bg-primary hover:text-white transition-all"
                        >
                            Explore Menu
                        </NavLink>
                        <NavLink
                            to="/story"
                            className="min-w-[180px] rounded-full border border-white px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-all font-display"
                        >
                            Our Story
                        </NavLink>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
                <div className="mb-16 flex flex-col items-end justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <span className="text-primary font-bold text-sm uppercase tracking-widest font-display">Limited Release</span>
                        <h3 className="font-serif mt-2 text-4xl font-bold dark:text-slate-100">The Signature Box</h3>
                    </div>
                    <NavLink to="/menu" className="group flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-display">
                        View Full Menu
                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white dark:bg-slate-900/50 shadow-xl lg:grid-cols-2">
                    <div
                        className="h-96 w-full bg-cover bg-center lg:h-auto"
                        role="img"
                        aria-label="A pile of thick decadent chocolate cookies"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCyQdTD72OGJydatxenrifXEK92WbVa6FZ-pkJrgBQFPAz9hYM1_SE_Dqzo4fkFlr8oaVraGVvRt1c_d3xaFG4cPEq2GVlV-TriCWS5s8yibgj6Hg9RmzJfK69To5ca0w1ptHs5Bp9LriCDeTKSid2Wm18CWFE86a2Rauayh-DfSfJrut8sYTEeaGGVhHKC1AW3gNQI4Fz1SIeWBqjZPmpCPj79ZMvVsG1DyOoqH7nXgO5OWSDp5E0-zFuj6-xWk-p1BcsdSfpF6Jg")' }}
                    />
                    <div className="flex flex-col justify-center p-12 lg:p-20">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-display">Always Freshly Baked</span>
                        </div>
                        <h4 className="font-serif text-3xl font-bold text-slate-900 dark:text-slate-100 lg:text-4xl">Dubai Chewy Cookie Premium</h4>
                        <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-display">
                            Our signature dough infused with premium 70% dark chocolate and a proprietary blend of Middle Eastern pistachios and kadayif, creating an unbelievable crunch wrapped in a chewy foundation.
                        </p>
                        <div className="mt-10 flex items-center justify-between border-t border-primary/10 pt-8 font-display">
                            <div>
                                <span className="block text-sm text-slate-400">Price</span>
                                <span className="text-2xl font-bold text-primary">View Drop</span>
                            </div>
                            <NavLink
                                to="/menu"
                                className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-bold text-white hover:opacity-90 transition-all font-display"
                            >
                                Order Now
                                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-primary/5 py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                        <div className="relative">
                            <div
                                className="aspect-square w-full rounded-2xl bg-cover bg-center shadow-2xl"
                                role="img"
                                aria-label="Baker handling perfectly baked cookies"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-H9vjZOQulRgNifha4oZ2nuZk88B-vtmNpIjsuWj4hnlpnwGZxGq_X8EOeAV38iWxEAjlf7Y0p4p2b9PR-UoN6qxt7TAYqm89iHMzwf0hG9433Z4zwzGlCjkLljjD4pDGSbNPgTazAFf2WXtz_KMHt25-cNmQk9ImFYlrdzksBmSDXF9I1y2Lf-3275JiBURESeDi7ktokSuQAl7KJSeO56kkqK1qw8TbkVcbGpej0Ud1IOwoWn-awFCkiQDBDSaWwev-JebDY4k")' }}
                            />
                            <div className="absolute -bottom-8 -right-8 hidden h-48 w-48 rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800 md:flex flex-col items-center justify-center text-center">
                                <span className="font-serif text-4xl font-bold text-primary">100%</span>
                                <span className="text-xs font-bold uppercase tracking-tight text-slate-500 font-display">Authentic</span>
                            </div>
                        </div>

                        <div className="max-w-xl">
                            <h3 className="font-serif text-4xl font-bold text-slate-900 dark:text-slate-100 lg:text-5xl italic">
                                Born from a passion for <span className="not-italic text-primary">Texture.</span>
                            </h3>
                            <p className="mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-display">
                                Not all cookies are created equal. We sought out to capture the viral magic of Dubai's chocolate bars and translated that profound visceral crunch into a format that is profoundly comforting: the classic chewy cookie.
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-display">
                                Using only the finest ingredients—from pure hand-spun kadayif to ultra-premium cocoa—we ensure every bite delivers the authentic crunch you've been craving.
                            </p>
                            <NavLink
                                to="/story"
                                className="mt-10 inline-block border-b-2 border-primary pb-1 text-sm font-bold uppercase tracking-widest text-primary hover:border-slate-900 dark:hover:border-white transition-all font-display"
                            >
                                Learn Our Philosophy
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
