import React, { useState } from "react";
import { AnimatePresence } from "framer-motion"; // Para animações de transição
import OrderList from "./orderList";             // Lista lateral de pedidos
import OrderDetails from "./orderDetails";       // Detalhes do pedido selecionado

// 🔹 Simulação de pedidos (mock)
const sampleOrders = [
  {
    id: "001",
    cliente: "Mesa 3",
    itens: ["X-Burger", "Coca-cola","Sorvete de Morango", "Bata Frita"], // Ainda não estruturado por nome + observação aqui
    descricao: "Coca 1L ",
    pagamento: "PIX",
    status: "Recebido",
  },
  {
    id: "002",
    cliente: "Mesa 7",
    itens: ["Pizza 4 Queijo ", "Coca-cola", "Pizza de Chocolate"],
    descricao: "Coca Lata",
    pagamento: "Cartão de debito",
    status: "Em preparo",
  },
  {
    id: "003",
    cliente: "Mesa 4",
    itens: ["Coxinha", "Coca-cola", "Sorvete de Chocolate"],
    descricao: "Coca Lata,",
    pagamento: "Dinheiro",
    status: "Em preparo",
  },
];

export default function PdvDashboard() {
  // 🔧 Estados principais
  const [orders, setOrders] = useState(sampleOrders);              // Lista de pedidos
  const [darkMode, setDarkMode] = useState(false);                 // Tema claro/escuro
  const [filtroStatus, setFiltroStatus] = useState("Todos");       // Filtro do select
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null); // Pedido em exibição no painel

  // 🔁 Atualiza o status de um pedido
  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    if (pedidoSelecionado?.id === id) {
      setPedidoSelecionado((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // ❌ Cancela o pedido após confirmação do usuário
  const handleCancelOrder = (id) => {
    const confirmCancel = window.confirm("Deseja realmente cancelar esse pedido?");
    if (confirmCancel) {
      handleStatusChange(id, "Cancelado pela cozinha");
    }
  };

  // 🌙 Alterna entre modo claro e escuro
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // ✅ Marca o pedido como "Em preparo"
  const emitirPedido = (id) => {
    handleStatusChange(id, "Em preparo");
  };

  // 🔍 Aplica o filtro de status ao array de pedidos
  const filteredOrders =
    filtroStatus === "Todos"
      ? orders
      : orders.filter((order) => order.status === filtroStatus);

  return (
    // 🌈 Estilização global (modo claro/escuro + fundo + transição)
    <div className={`flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen transition-colors duration-300`}>
      
      {/* 🧾 Sidebar lateral com pedidos */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-4 border-r">
        
        {/* 🔄 Título + botão de alternar tema */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pedidos do Dia</h2>
          <label className="flex items-center space-x-2 cursor-pointer">
            <i className="bi bi-moon-stars-fill"></i>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </label>
        </div>

        {/* 🔽 Select de filtro de status */}
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="p-2 rounded-lg border text-sm bg-white text-black w-full mb-4"
        >
          <option value="Todos">Todos os Status</option>
          <option value="Recebido">Recebido</option>
          <option value="Em preparo">Em preparo</option>
          <option value="Pronto">Pronto</option>
          <option value="Entregue">Entregue</option>
          <option value="Cancelado pela cozinha">Cancelado pela cozinha</option>
        </select>

        {/* 📋 Lista lateral com os pedidos (estilização dos cards está no componente OrderList.jsx) */}
        <OrderList
          orders={filteredOrders}
          selectedId={pedidoSelecionado?.id}
          onSelect={setPedidoSelecionado}
          darkMode={darkMode}
        />
      </div>

      {/* 📦 Painel principal com detalhes do pedido */}
      <main className="flex-1 p-6">
        <AnimatePresence>
          <OrderDetails
            pedido={pedidoSelecionado}
            onEmitir={emitirPedido}
            onCancelar={handleCancelOrder}
            onStatusChange={handleStatusChange}
            darkMode={darkMode}
          />
        </AnimatePresence>
      </main>
    </div>
  );
}
