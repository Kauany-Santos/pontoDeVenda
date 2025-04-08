import React from "react";
import { motion } from "framer-motion";

// Componente que exibe os detalhes de um pedido selecionado
export default function OrderDetails({ pedido, onEmitir, onCancelar, onStatusChange, darkMode }) {
  // Se nenhum pedido estiver selecionado, mostra uma mensagem
  if (!pedido) return <p className="text-center text-gray-400">Selecione um pedido para visualizar os detalhes.</p>;

  return (
    // Animação de entrada e saída com Framer Motion
    <motion.div
      key={pedido.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl p-6 shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
    >
      {/* Título com os itens do pedido listados em uma lista com marcadores */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold mb-1">Itens ({pedido.itens.length}):</h3>
          <ul className="list-disc list-inside text-lg">
            {pedido.itens.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Informação da mesa */}
        <span className="px-4 py-2 rounded-lg bg-gray-200 text-sm text-black self-start whitespace-nowrap">
          Mesa: {pedido.cliente}
        </span>
      </div>

      {/* Se houver observações, elas serão exibidas aqui */}
      {pedido.descricao && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold">Observações:</h4>
          <p className={`p-3 rounded-lg mt-2 text-sm ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>
            {pedido.descricao}
          </p>
        </div>
      )}

      {/* Forma de pagamento e status do pedido */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Forma de pagamento */}
        <div>
          <label htmlFor="pagamento" className="font-medium block mb-1">Forma de Pagamento:</label>
          <p id="pagamento" className="flex items-center gap-2 text-sm">
            <i className="bi bi-cash-coin text-green-500"></i> {pedido.pagamento}
          </p>
        </div>

        {/* Campo de seleção para mudar o status do pedido */}
        <div>
          <label htmlFor="status" className="font-medium block mb-1">Status:</label>
          <select
            id="status"
            value={pedido.status}
            onChange={(e) => onStatusChange(pedido.id, e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
          >
            <option value="Recebido">Recebido</option>
            <option value="Em preparo">Em preparo</option>
            <option value="Pronto">Pronto</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado pela cozinha">Cancelado pela cozinha</option>
          </select>
        </div>
      </div>

      {/* Botões de ação para emitir ou cancelar pedido */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => onEmitir(pedido.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <i className="bi bi-check2-circle"></i> Emitir Pedido
        </button>

        <button
          onClick={() => onCancelar(pedido.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <i className="bi bi-x-circle"></i> Cancelar Pedido
        </button>
      </div>
    </motion.div>
  );
}
