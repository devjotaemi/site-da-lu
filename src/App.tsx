import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Star, Heart, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

const products: Product[] = [
  { id: 1, name: "Sabonete Massageador", description: "120 a 130g • Textura especial para massagem", price: 16.00, image: "./public/images/sabonetemassageadora.jpg" },
  { id: 2, name: "Geleia de Banho", description: "Hidratação intensa e aroma delicioso", price: 21.00, image: "./public/images/geleia de banho.jpg" },
  { id: 3, name: "Sabonete em Formato de Rosa", description: "70g • Aroma romântico de rosas", price: 12.50, image: "./public/images/sabonete rosa.jpg" },
  { id: 4, name: "Sabonete Artesanal", description: "80g • Clássico e perfumado", price: 13.50, image: "./public/images/saboneteartesanal.jpg" },
  { id: 5, name: "Kit Hidratante + Sabonete", description: "Combinação perfeita de cuidados", price: 59.90, image: "./public/images/kithidratante.jpg" },
  { id: 6, name: "Sabonete Massageador de Margarida", description: "120-130g • Delicado e relaxante", price: 16.00, image: "./public/images/sabonetemassageadora.jpg" },
  { id: 7, name: "Sabonete de Tulipa e Margarida", description: "70g • Floral suave e delicado", price: 10.50, image: "./public/images/sabonetetulipa.jpg" },
  { id: 8, name: "Sabonete em Cachos", description: "Formato especial em cachos", price: 13.50, image: "./public/images/cachos.jpg" },
  { id: 9, name: "Creme Hidratante", description: "110g • Hidratação profunda", price: 18.00, image: "./public/images/creme hidratante.jpg" }
];

const testimonials = [
  { name: "Ana Clara", location: "São José do Rio Preto", text: "Os sabonetes são incríveis! Duram bastante e deixam a pele super macia. O de rosa é o meu favorito!" },
  { name: "Mariana Silva", location: "Ribeirão Preto", text: "A geleia de banho é maravilhosa! O cheiro fica na pele o dia todo. Já pedi o segundo pote!" },
  { name: "Juliana Mendes", location: "São Paulo", text: "Comprei o kit de presente e a pessoa amou! O acabamento é perfeito e o cheiro é divino." },
  { name: "Beatriz Costa", location: "Campinas", text: "O sabonete massageador é uma delícia! Sinto que estou no spa em casa. Recomendo demais!" }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return;
    let msg = "Olá Madamy Lu! 💕\n\nQuero fazer o seguinte pedido:\n\n";
    cart.forEach(item => {
      msg += `• ${item.quantity}x ${item.name} → R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });
    msg += `\nTotal dos produtos: R$ ${cartTotal.toFixed(2).replace('.', ',')}\n\n`;
    msg += "Pode me informar o valor do frete para o meu CEP e confirmar o pedido? Aguardo seu retorno! 🌸";
    
    window.open(`https://wa.me/5517997558625?text=${encodeURIComponent(msg)}`, '_blank');
    setIsCartOpen(false);
    setCart([]);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen relative selection:bg-rose-200 selection:text-rose-900">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('inicio')}>
            <div className="w-12 h-12 bg-rose-200 rounded-2xl flex items-center justify-center text-rose-600 font-serif font-bold text-2xl shadow-inner">
            <img src="./public/images/logomadamy.jpg" alt="Logo" className="w-full h-full rounded-2xl object-cover" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-rose-800 tracking-tight leading-none">Madamy Lu</h1>
              <p className="text-[10px] text-rose-500 font-medium tracking-[0.2em] uppercase mt-1">Saboaria Artesanal</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-rose-800 font-medium">
            <button onClick={() => scrollTo('inicio')} className="hover:text-rose-500 transition-colors">Início</button>
            <button onClick={() => scrollTo('sobre')} className="hover:text-rose-500 transition-colors">Sobre a Lu</button>
            <button onClick={() => scrollTo('produtos')} className="hover:text-rose-500 transition-colors">Produtos</button>
            <button onClick={() => scrollTo('depoimentos')} className="hover:text-rose-500 transition-colors">Depoimentos</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-rose-700 hover:bg-rose-100 rounded-full transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            
            <a 
              href="https://wa.me/5517997558625?text=Oi%20Madamy%20Lu!%20Vim%20pelo%20seu%20site%20%F0%9F%92%95" 
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#20c65e] text-white px-5 py-2.5 rounded-full font-medium shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={18} />
              <span>Falar com a Lu</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-gradient">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-rose-100/50 backdrop-blur-sm px-4 py-2 rounded-full text-rose-700 text-sm font-medium border border-rose-200/50">
              <Sparkles size={16} className="text-rose-500" />
              Feito com muito amor em São José do Rio Preto
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold font-serif text-rose-900 leading-[1.1] tracking-tight">
              Saboaria<br/>
              <span className="italic text-rose-500">Artesanal</span>
            </h1>
            
            <p className="text-xl text-rose-800/80 max-w-md font-light leading-relaxed">
              Sabonetes, geleias e mimos feitos à mão com ingredientes naturais e muito carinho para o seu momento de autocuidado.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollTo('produtos')}
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-xl shadow-rose-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Ver Produtos <ArrowRight size={20} />
              </button>
              <a 
                href="https://wa.me/5517997558625?text=Oi%20Lu!%20Quero%20conhecer%20seus%20produtos%20%F0%9F%92%96" 
                target="_blank"
                rel="noreferrer"
                className="bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 px-8 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Falar com a Lu
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 0.85 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-rose-200/50 relative">
              <img 
                src="./public/images/sabonetemassageadora.jpg" 
                alt="Sabonetes Artesanais" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent"></div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-rose-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="font-serif font-bold text-rose-900 text-lg">100% Natural</p>
                  <p className="text-sm text-rose-600">Ingredientes selecionados</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-25">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-500px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-full overflow-hidden border-8 border-rose-50 shadow-2xl relative z-10">
                <img 
                  src="./public/images/lu.jpg" 
                  alt="Processo Artesanal" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-rose-100 rounded-full blur-3xl opacity-50"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="uppercase text-rose-400 text-sm font-bold tracking-[0.2em]">Conheça a criadora</div>
              <h2 className="text-5xl md:text-6xl font-bold text-rose-900 font-serif leading-none">Oi, eu sou a Lu! 🌸</h2>
              <div className="prose prose-rose prose-lg text-rose-800/80 leading-relaxed">
                <p>A Madamy Lu nasceu do meu grande amor por criar produtos que fazem as pessoas se sentirem especiais.</p>
                <p>Todos os sabonetes, geleias de banho e mimos são feitos por mim, à mão, com ingredientes naturais de qualidade. Meu maior prazer é imaginar você usando meus produtos e sentindo aquele carinho que só um produto artesanal pode oferecer.</p>
                <p>Cada peça é pensada com muito amor, desde a escolha dos aromas até o acabamento final. É como se eu estivesse enviando um abraço perfumado direto para o seu banho.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produtos" className="py-32 bg-rose-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-rose-900 mb-4">Nossos Produtos</h2>
            <p className="text-lg text-rose-600">Todos feitos à mão com muito carinho</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map(product => (
              <motion.div 
                key={product.id}
                variants={itemVariants}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-rose-100 group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif font-bold text-2xl text-rose-900 mb-2">{product.name}</h3>
                  <p className="text-rose-600/80 text-sm mb-6 min-h-[40px]">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-rose-700">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"
                      aria-label="Adicionar ao carrinho"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-rose-900 mb-4">O que as clientes dizem</h2>
            <p className="text-lg text-rose-600">Amor verdadeiro pelos produtos da Madamy Lu</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-rose-50/50 p-8 rounded-3xl border border-rose-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="italic text-rose-800 mb-8 leading-relaxed">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center text-rose-600 font-serif font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-rose-900">{testimonial.name}</div>
                    <div className="text-sm text-rose-500">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-900 text-rose-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-rose-800 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-6">
            ML
          </div>
          <h3 className="font-serif text-2xl font-bold text-white mb-2">Madamy Lu</h3>
          <p className="text-rose-300 mb-8">Saboaria Artesanal • São José do Rio Preto - SP</p>
          <div className="w-24 h-px bg-rose-800 mx-auto mb-8"></div>
          <p className="text-sm text-rose-400">© {new Date().getFullYear()} Madamy Lu • Feito com muito amor</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-rose-900/20 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
            >
              <div className="p-6 border-b border-rose-100 flex justify-between items-center bg-rose-50/50">
                <h3 className="text-2xl font-serif font-bold text-rose-900 flex items-center gap-2">
                  Seu Carrinho <Sparkles size={20} className="text-rose-500" />
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-rose-400 space-y-4">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p>Seu carrinho está vazio...</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-white border border-rose-100 rounded-2xl p-4 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" referrerPolicy="no-referrer" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-rose-900 leading-tight">{item.name}</div>
                          <div className="text-rose-600 font-medium mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-rose-50 rounded-full px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="text-rose-600 hover:text-rose-900 p-1">
                              <Minus size={16} />
                            </button>
                            <span className="font-medium text-rose-900 w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="text-rose-600 hover:text-rose-900 p-1">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-6 border-t border-rose-100 bg-rose-50/50">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-rose-600 font-medium">Total</span>
                  <span className="text-3xl font-serif font-bold text-rose-900">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button 
                  onClick={sendWhatsAppOrder}
                  disabled={cart.length === 0}
                  className="w-full bg-[#25D366] hover:bg-[#20c65e] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-200"
                >
                  <MessageCircle size={24} />
                  Enviar Pedido
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
