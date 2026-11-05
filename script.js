const WHATSAPP = "5583999722597";
const products = [
 {id:"cali",cat:"hamburgueres",name:"Cali Cheese",price:17,desc:"Pão brioche, carne 110g artesanal na brasa, queijo mussarela, cream cheese, alface e molho especial da casa."},
 {id:"cartagena",cat:"hamburgueres",name:"Cartagena",price:17.90,desc:"Pão brioche, carne 110g na brasa, queijo mussarela, calabresa, cebola caramelizada, alface, tomate e molho especial da casa."},
 {id:"tocineta",cat:"hamburgueres",name:"Tocineta",price:18.90,desc:"Pão brioche, carne 110g na brasa, queijo mussarela, bacon em dobro, cebola caramelizada, alface, tomate e molho especial da casa."},
 {id:"nordestino",cat:"hamburgueres",name:"El Nordestino",price:19.90,desc:"Pão brioche, carne 110g na brasa, queijo opcional (coalho ou manteiga), cebola caramelizada, alface e molho especial da casa."},
 {id:"chorizo",cat:"hamburgueres",name:"El Chorizo",price:19.90,desc:"Pão brioche, carne 110g na brasa, linguiça toscana na brasa, queijo mussarela, cebola caramelizada, alface, tomate e molho especial da casa."},
 {id:"san-andres",cat:"hamburgueres",name:"San Andrés (Tropical)",price:19.99,desc:"Pão brioche, carne 110g na brasa, queijo mussarela, abacaxi caramelizado, alface e molho especial da casa."},
 {id:"aros",cat:"porcoes",name:"Aros de cebola",price:20.90,desc:"3 anéis de cebola, cebola caramelizada, alface e molho especial da casa."},
 {id:"medellin",cat:"hamburgueres",name:"Medellín",price:21,desc:"Pão brioche, carne 110g na brasa, queijo mussarela, bacon, alface, tomate, cebola caramelizada e molho especial da casa.",tag:"MAIS VENDIDO"},
 {id:"patron",cat:"hamburgueres",name:"El Patrón",price:21.90,desc:"Pão brioche, carne 110g na brasa, queijo cheddar, presunto, batata palha, creme de cheddar, cebola caramelizada e molho especial da casa."},
 {id:"parceiros",cat:"hamburgueres",name:"La Parceiros",price:23.90,desc:"Pão brioche, carne 125g na brasa, queijo cheddar, carne de sol desfiada, creme de cheddar, cebola caramelizada, alface, tomate e molho especial da casa.",tag:"FAVORITO DA CASA"},
 {id:"bogota",cat:"hamburgueres",name:"Bogotá (El Poderoso)",price:26,desc:"Pão brioche, 2 carnes 110g na brasa, 2 queijos cheddar, bacon, cebola caramelizada, creme de cheddar e molho especial da casa.",tag:"EL BRABO"},
 {id:"kids",cat:"combos",name:"Parceirinho Burger Kids",price:22.90,desc:"Pão brioche, carne 110g na brasa, queijo mussarela e molho especial da casa. Acompanha batata, nuggets e refrigerante 250ml."},
 {id:"combo-medellin",cat:"combos",name:"Combo Medellín",price:23.90,desc:"Hambúrguer Medellín + batata frita + refrigerante 250ml."},
 {id:"combo-san",cat:"combos",name:"Combo San Andrés",price:25.90,desc:"Hambúrguer San Andrés + batata frita + refrigerante 250ml."},
 {id:"combo-patron",cat:"combos",name:"Combo El Patrón",price:26.90,desc:"Hambúrguer El Patrón + batata frita + refrigerante 250ml."},
 {id:"combo-parceiros",cat:"combos",name:"Combo La Parceiros",price:27.90,desc:"Hambúrguer La Parceiros + batata frita + refrigerante 250ml."},
 {id:"combo-bogota",cat:"combos",name:"Combo Bogotá",price:31.90,desc:"Hambúrguer Bogotá + batata frita + refrigerante 250ml."},
 {id:"batata-m",cat:"porcoes",name:"Batata frita M",price:7,desc:"Porção de batata frita tamanho M."},
 {id:"batata-p",cat:"porcoes",name:"Batata frita P",price:12,desc:"Porção de batata frita tamanho P."},
 {id:"coca-2l",cat:"bebidas",name:"Coca-Cola 2 litros",price:15,desc:"Garrafa 2 litros."},
 {id:"coca-1l",cat:"bebidas",name:"Coca-Cola 1 litro",price:10,desc:"Garrafa 1 litro."},
 {id:"guarana-1l",cat:"bebidas",name:"Guaraná 1 litro",price:9,desc:"Garrafa 1 litro."}
];
const money = n => n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
let cart = {};
let current = "hamburgueres";
const grid=document.getElementById("products");
function render(){
 const list=products.filter(p=>p.cat===current);
 grid.innerHTML=list.map(p=>`<article class="product"><div class="product-top"><div><h3>${p.name}</h3>${p.tag?`<span class="tag">✦ ${p.tag}</span>`:""}</div><span class="price">${money(p.price)}</span></div><p class="desc">${p.desc}</p><div class="product-bottom"><span class="tag">${p.cat==="hamburgueres"?"100% ARTESANAL • NA BRASA":p.cat==="combos"?"COMBO ARTESANAL":p.cat==="bebidas"?"BEBIDA":"PORÇÃO"}</span><button class="add" data-add="${p.id}">+ ADICIONAR</button></div></article>`).join("");
}
document.querySelectorAll(".category").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".category.active").classList.remove("active");b.classList.add("active");current=b.dataset.filter;render();}));
function updateCart(){
 const entries=Object.entries(cart).filter(([id,q])=>q>0);
 document.getElementById("cart-count").textContent=entries.reduce((s,[,q])=>s+q,0);
 document.getElementById("cart-total").textContent=money(entries.reduce((s,[id,q])=>s+products.find(p=>p.id===id).price*q,0));
 document.getElementById("cart-items").innerHTML=entries.length?entries.map(([id,q])=>{const p=products.find(x=>x.id===id);return `<div class="cart-row"><div><strong>${p.name}</strong><small>${money(p.price)} cada</small></div><div class="qty"><button data-minus="${id}">−</button><b>${q}</b><button data-plus="${id}">+</button></div></div>`}).join(""):'<p class="empty">Sua sacola ainda está vazia.</p>';
}
grid.addEventListener("click",e=>{const id=e.target.dataset.add;if(id){cart[id]=(cart[id]||0)+1;updateCart();document.body.classList.add("cart-open");}});
document.getElementById("cart-items").addEventListener("click",e=>{let id=e.target.dataset.plus||e.target.dataset.minus;if(!id)return;cart[id]=(cart[id]||0)+(e.target.dataset.plus?1:-1);if(cart[id]<=0)delete cart[id];updateCart();});
function toggleCart(open){document.body.classList.toggle("cart-open",open);document.getElementById("cart-drawer").setAttribute("aria-hidden",String(!open));}
document.getElementById("cart-open").onclick=()=>toggleCart(true);document.getElementById("cart-close").onclick=()=>toggleCart(false);document.getElementById("cart-backdrop").onclick=()=>toggleCart(false);
document.getElementById("checkout").onclick=()=>{
 const entries=Object.entries(cart).filter(([id,q])=>q>0);if(!entries.length){alert("Adicione pelo menos um produto à sua sacola.");return;}
 const name=document.getElementById("customer-name").value.trim();
 const lines=entries.map(([id,q])=>{const p=products.find(x=>x.id===id);return `${q}x ${p.name} — ${money(p.price*q)}`;});
 const total=entries.reduce((s,[id,q])=>s+products.find(p=>p.id===id).price*q,0);
 const msg=`Olá, PARCEIROS BURGUÊS! Quero fazer um pedido:\n${name?`Nome: ${name}\n`:""}\n${lines.join("\n")}\n\nTotal: ${money(total)}\n\nPodem confirmar meu pedido?`;
 window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
};
document.getElementById("year").textContent=new Date().getFullYear();render();updateCart();
