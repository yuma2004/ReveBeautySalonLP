// アニメーション管理クラス
class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupLoadingAnimation();
        this.setupHoverEffects();
        this.setupParallaxEffects();
    }
    
    // Intersection Observer でスクロールアニメーションを設定
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // 特定の要素に対して遅延アニメーションを適用
                    if (entry.target.classList.contains('feature-item')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.2}s`;
                    }
                    
                    if (entry.target.classList.contains('review-item')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.3}s`;
                    }
                    
                    if (entry.target.classList.contains('achievement-point')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.4}s`;
                    }
                    
                    if (entry.target.classList.contains('faq-item')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.15}s`;
                    }
                }
            });
        }, options);
        
        // アニメーション対象の要素を監視
        const animatedElements = document.querySelectorAll(`
            .catchphrase-section,
            .feature-item,
            .achievement-section,
            .review-item,
            .achievement-details,
            .achievement-point,
            .faq-section,
            .faq-item,
            .final-cta-section
        `);
        
        // CTAボタンは別途処理
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(el => {
            observer.observe(el);
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // スクロールに応じたアニメーション
    setupScrollAnimations() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallax = document.querySelectorAll('.parallax');
                    const speed = 0.5;
                    
                    parallax.forEach(element => {
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translateY(${yPos}px)`;
                    });
                    
                    // ヒーローセクションのパララックス効果
                    const heroImage = document.querySelector('.hero-image');
                    if (heroImage) {
                        const yPos = scrolled * 0.3;
                        heroImage.style.transform = `translateY(${yPos}px)`;
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll);
    }
    
    // ローディングアニメーション
    setupLoadingAnimation() {
        // ページロード時のアニメーション
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // ヒーローセクションの段階的アニメーション
            setTimeout(() => {
                document.querySelector('.hero-title-line1')?.classList.add('animate-slide-in-left');
            }, 300);
            
            setTimeout(() => {
                document.querySelector('.hero-divider-1')?.classList.add('animate-expand');
            }, 600);
            
            setTimeout(() => {
                document.querySelector('.hero-title-line2')?.classList.add('animate-slide-in-left');
            }, 900);
            
            setTimeout(() => {
                document.querySelector('.hero-divider-2')?.classList.add('animate-expand');
            }, 1200);
            
            setTimeout(() => {
                document.querySelector('.hero-main-title')?.classList.add('animate-zoom-in');
            }, 1500);
            
            setTimeout(() => {
                document.querySelector('.hero-description')?.classList.add('animate-fade-in-up');
            }, 1800);
            
            setTimeout(() => {
                document.querySelector('.hero-cta-button')?.classList.add('animate-bounce-in');
            }, 2100);
        });
    }
    
    // ホバーエフェクト
    setupHoverEffects() {
        // CTAボタンのホバーエフェクト
        const ctaButtons = document.querySelectorAll('.cta-button, .hero-cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('hover-effect');
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.remove('hover-effect');
            });
        });
        
        // 特徴セクションのホバーエフェクト
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('hover-lift');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('hover-lift');
            });
        });
        
        // レビューアイテムのホバーエフェクト
        const reviewItems = document.querySelectorAll('.review-item');
        reviewItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('hover-glow');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('hover-glow');
            });
        });
    }
    
    // パララックス効果
    setupParallaxEffects() {
        // 背景要素にパララックスクラスを追加
        const heroBackground = document.querySelector('.hero-background');
        // const contentBackground = document.querySelector('.content-background');
        
        if (heroBackground) heroBackground.classList.add('parallax');
        // コンテンツ全体の背景は固定するためパララックスを適用しない
        // if (contentBackground) contentBackground.classList.add('parallax');
    }
}

// ページ読み込み時にアニメーションマネージャーを初期化
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
    
    // プリローダーの実装
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading...</div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    // プリローダーを非表示にする
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// マウスカーソル追従エフェクト
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
});

// レスポンシブ対応のアニメーション調整
const mediaQuery = window.matchMedia('(max-width: 768px)');
const handleMobileView = (e) => {
    if (e.matches) {
        // モバイル向けのアニメーション調整
        document.documentElement.style.setProperty('--animation-duration', '0.6s');
        document.documentElement.style.setProperty('--animation-delay', '0.1s');
    } else {
        // デスクトップ向けのアニメーション設定
        document.documentElement.style.setProperty('--animation-duration', '1s');
        document.documentElement.style.setProperty('--animation-delay', '0.2s');
    }
};

mediaQuery.addListener(handleMobileView);
handleMobileView(mediaQuery); 