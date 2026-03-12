import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Story() {
    return (
        <main className="flex-1 font-display">
            <section className="px-6 lg:px-20 py-12 lg:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Our Obsession</span>
                            <h1 className="text-4xl lg:text-7xl font-extrabold text-slate-900 dark:text-slate-100 leading-[1.1] mb-6">
                                Chasing the <span className="text-primary italic font-serif">Perfect</span> Crunch.
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
                                It started with a single viral chocolate bar from Dubai. The texture, the rich pistachio, the shattering crispness of kadayif. We knew we had to recreate that magic in our favorite form: the ultimate chewy cookie.
                            </p>
                            <div className="flex gap-4">
                                <NavLink to="/menu" className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-transform">
                                    View Our Menu
                                </NavLink>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                                <div
                                    className="bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl relative z-10"
                                    role="img"
                                    aria-label="Rustic close-up of freshly baked cookie"
                                    style={{
                                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYiYXof7T24buQioDVBavrpIcG_8QlTx0c5T98yyU9IDrT7vu8y-1LczuHx3B4fHxBc0or9jDcTLOyN9HKrMlchFdHIzGFWxyLh3k773E9-yfBEMLjxKHx-WDkjhNvtCZsZFcDBiEltQzby_6ATEMNUwPc8ke6zfMV-t-sunl1pGtAUNOI9xEBpO7aDV5oW79xAFbnnNbThturgAlcAeHt_-RgXo_cVqrIz1-ErrWDSmNXModrt7rSTi17dKdzF2gGqmwQImr1P1M")',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-4 border-primary/20 rounded-2xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-100 dark:bg-slate-900/50 py-24 px-6 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Core Philosophy</h2>
                        <div className="h-1 w-20 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-slate-200 dark:border-primary/10 group hover:border-primary transition-colors">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">hourglass_empty</span>
                            <h3 className="text-xl font-bold mb-3">Slow Baked</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Good things take time. We age our dough to allow the complex flavors of brown butter and fine chocolate to develop perfectly before baking.</p>
                        </div>

                        <div className="p-8 bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-slate-200 dark:border-primary/10 group hover:border-primary transition-colors">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">eco</span>
                            <h3 className="text-xl font-bold mb-3">Authentic Sourcing</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">We source real, high-quality pistachios and authentic hand-spun baked kadayif to ensure the signature crunch is never compromised.</p>
                        </div>

                        <div className="p-8 bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-slate-200 dark:border-primary/10 group hover:border-primary transition-colors">
                            <span className="material-symbols-outlined text-4xl text-primary mb-4">hand_gesture</span>
                            <h3 className="text-xl font-bold mb-3">Hand Rolled</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">No mass production lines here. Each cookie is heavily stuffed by hand to ensure the perfect ratio of chewy outer shell to explosive filling.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 lg:px-20">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                        <div
                            className="h-[400px] rounded-xl overflow-hidden"
                            role="img"
                            aria-label="Baker working with dough"
                            style={{
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUSM8FABMNSQ4iusdfZKUK9q_qNKufuch7FhgyQsoceFLx8K-BVVvyGRRNLxISlmI4HKhXKYtrH8lVBLMllyNOyveCalh5em1p_wfjWoIzUEBEAVke6Z2tixb_xZjuwaQSwMCsDwnqBZdNqbTVPgIwAD1tk9mYOlI1nKqyxarKihqcJyozXl3f5acQWMRuQWGgHa3RWJ6H-KXuwPOjR0hmMNK57m61_GPuuCabFnlZNJdd6ccCoYipp2yFoaka1TZTfy22l_RycX8")',
                                backgroundSize: 'cover'
                            }}
                        />
                        <div
                            className="h-[400px] rounded-xl overflow-hidden mt-12"
                            role="img"
                            aria-label="Close up of hands making dough"
                            style={{
                                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1UwDVp4LjIdYjUHQEgnbJverG3K14-oFFNv3IsSbBUp1ki6oTDtEV3l6Ry0-MYNRfENwutFGQgdNSfWQ7OZ5DZ9Ge1lfyf7Frlgr8rW1DJUE_jQ-tnM5WMpsUHY19mPD58ujTGoBcGUFxePxBbrc1VBQHHkWdDtlNVmk_PYqL9QWNJ7j5GOQIYAkqRI_6Pc8jQJ3j_0vlTQ4MwKPXRs9RJw4TyZwUy79t4oIAGG5Tept_uVy5KMWdrcpeuvn_Jxooc1I3VyPs49k")',
                                backgroundSize: 'cover'
                            }}
                        />
                    </div>

                    <div className="lg:w-1/2">
                        <span className="text-primary font-bold uppercase text-xs mb-4 block">Our Origin</span>
                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900 dark:text-slate-100">From a Craving to Local Phenomenon.</h2>
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed italic border-l-4 border-primary/20 pl-8 py-2">
                            <p>"I couldn't fly to Dubai, and I couldn't accept mediocre imitations. So I locked myself in the kitchen for three weeks straight until the pistachio ratio and the kadayif crunch were absolutely perfect."</p>
                        </div>
                        <p className="mt-8 text-slate-600 dark:text-slate-400 leading-relaxed">
                            We started out of a small kitchen in South Korea, sharing our creations with friends. The overwhelming response told us we had captured something special. A profound, satisfying crunch wrapped inside the nostalgia of a warm, chewy cookie.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-primary/5 py-24 px-6 lg:px-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
                        <div
                            className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-SZUWSZg9PxBxT8HeRZy3fNa8J289ofyQpYF-6ffaIEwOustQCl2_AauGZvt2KMca7ibSVDhAvIkiFa4dZr3aTl1wC0DbkBAQSIwy_AyRbugG-KWV89sH5UJwDaYHkfW5-Hc3EFWigwKABPVJPZk3mkw_5g3in6BizJMy8WBRjVALBpXJ4AT69uDSB6EeZ9XEL11xzVHPgk-4Ehhyfck8jQNzGHMEAQpns4sS0AniqdLIW7kAsXo4bR3wg5cNFtW-95cNtooAjA")', backgroundSize: 'cover' }}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-8">
                                <p className="text-white text-xl font-bold">The Morning Bake</p>
                            </div>
                        </div>

                        <div
                            className="rounded-2xl overflow-hidden relative group"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbwIOOOBxCKz63BCgl3sUf6NcZowfvOJQiXiuCazc1yzoNnaivSHS4Wom8RCNacBMEF2Jfr2clFphDbmk82qePegzI-MfXJOG3xSwCgQ30H3sYwFC0RZx31iJDqFYDKO2eVqQ4LYRBIqOXIjPFFXRRr8VvDHg6mP4d6XxiJJs0RkbU4VeAMwSr_RxDwm4FoVY7fQ8kpg2H-v_sy8eIkLh1j0JYMHnyVcxkwzcecQsxIQRvl78qaHalNzrN_nR_Cz06VGgRqEzjDSA")', backgroundSize: 'cover' }}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-4">
                                <p className="text-white font-bold">Daily Fulfillment</p>
                            </div>
                        </div>

                        <div
                            className="rounded-2xl overflow-hidden relative group"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAJgXbGMp2NBnOAP0eb7uJrmwUyKmYifxmdBDfbB5Mx0QabOB_5WDvEAGE8BNH8uTF3gPn77OJi-GNpyMao8qRSGbhu77j0dc2QUQvffvWARWfe6EzdgE_Vg2qRHQuSf1IDl2Pc5WPpCV0u5yUOvNtGggC7HAxV7HYg0KNGF8Mos4tEd3URshhZH-i4c79Ipcwv0Kw62vWCsxoRT-_nMJNhZeFjH3GMF4D1wM4Lh4oFnozeXFgJlsM_X1IDC23rjjHc1ftFjwshOG4")', backgroundSize: 'cover' }}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-4">
                                <p className="text-white font-bold">Perfect Pairing</p>
                            </div>
                        </div>

                        <div
                            className="md:col-span-2 rounded-2xl overflow-hidden relative group"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDM_LVeXYBJ1Qy0QIjUaYc2X3bgg4DAq6vuiCEaNFYVrbGn-DnUtxkloc0k3cnEZG2tQzYlKQOJZ1lYuAiWklyZhQS-s3J54YJaPR1B0HCy6GdG8uxe7DWJDjiZ-oLBscNUcKZMJy4feYzzaK8sbvxRSRvfHZsXXsgJwo9ZTxIR_r0FEseAXBtngH14cUHtyMYyuT0Xs91J5xFVAc2Dz845nhX6jJHpcUtqrFOYdaAATi4flPw9HNcT6C-vw4Z8nzxgI_Lel8uJ-Hs")', backgroundSize: 'cover' }}
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-end p-8">
                                <p className="text-white text-xl font-bold">A Craving Shared</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 lg:px-20 text-center">
                <div className="max-w-3xl mx-auto bg-slate-900 dark:bg-primary/10 rounded-[2rem] p-12 lg:p-20 text-white dark:text-slate-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6 relative z-10">Taste the Crunch Today</h2>
                    <p className="text-slate-300 dark:text-slate-400 mb-10 text-lg relative z-10">Have our legendary Dubai Chewy Cookies delivered fresh to your door in South Korea.</p>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <NavLink to="/menu" className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
                            Order Now
                        </NavLink>
                    </div>
                </div>
            </section>
        </main>
    );
}
