import React from "react";
import { motion } from "framer-motion"; // Importa o componente de animação do Framer Motion

// Função que retorna um texto com ícone correspondente ao status do pedido
function getStatusBadge(status) {
  const map = {
    "Recebido": "📥 Recebido",
    "Em preparo": "🟡 Em preparo",
    "Pronto": "🟢 Pronto",
    "Entregue": "✅ Entregue",
    "Cancelado pela cozinha": "🔴 Cancelado pela cozinha"
  };
  return map[status] || status; // Retorna o status com ícone ou apenas o texto, caso não esteja no mapa
}

// Componente principal da lista de pedidos
export default function OrderList({ orders, selectedId, onSelect, darkMode }) {
  return (
    // Container lateral responsivo com rolagem vertical e espaçamento entre os pedidos
    <aside className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 min-w-[280px] max-w-[400px] p-4 space-y-4 overflow-y-auto">
      {orders.map((order) => (
        // Cada pedido é um card animado com Framer Motion
        <motion.div
          key={order.id} // Chave única para renderização no React
          onClick={() => onSelect(order)} // Ao clicar, dispara a função para selecionar o pedido
          whileHover={{ scale: 1.03 }} // Animação de aumento leve ao passar o mouse
          whileTap={{ scale: 0.97 }} // Animação de clique (encolhe levemente)
          className={`
            cursor-pointer p-3 rounded-lg shadow transition-all duration-300
            ${selectedId === order.id ? "ring-2 ring-blue-500" : ""} // Destaque se estiver selecionado
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} // Suporte a modo escuro/claro
          `}
        >
          {/* Nome da mesa ou do cliente */}
          <p className="font-bold text-lg">Mesa {order.cliente}</p>

          {/* Lista dos itens do pedido, limitando a 2 linhas */}
          <p className="text-sm line-clamp-2">{order.itens.join(", ")}</p>

          {/* Rodapé do card: status e quantidade de itens */}
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs italic">{getStatusBadge(order.status)}</span>
            <span className="text-xs text-gray-400">{order.itens.length} itens</span>
          </div>
        </motion.div>
      ))}
    </aside>
  );
}
