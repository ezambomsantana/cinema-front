import React, { useEffect, useState } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: "", cpf: "", email: "" });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Busca clientes ao montar o componente
  useEffect(() => {
    async function carregarClientes() {
      setCarregando(true);
      try {
        const resp = await fetch("http://localhost:8080/clientes");
        if (!resp.ok) throw new Error("Erro ao buscar clientes");
        const data = await resp.json();
        setClientes(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }
    carregarClientes();
  }, []);

  // Adiciona novo cliente
  async function adicionarCliente(e) {
    e.preventDefault();
    setErro("");
    try {
      const resp = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente),
      });
      if (!resp.ok) throw new Error("Erro ao adicionar cliente");
      const clienteCriado = await resp.json();
      setClientes([...clientes, clienteCriado]);
      setNovoCliente({ nome: "", cpf: "", email: "" });
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h3>➕ Adicionar Cliente</h3>
      <form onSubmit={adicionarCliente}>
        <input
          type="text"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
          required
        />
        <br />
        <input
          type="text"
          placeholder="CPF"
          value={novoCliente.cpf}
          onChange={(e) => setNovoCliente({ ...novoCliente, cpf: e.target.value })}
          required
        />
        <br />
        <input
          type="email"
          placeholder="E-mail"
          value={novoCliente.email}
          onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
          required
        />
        <br />
        <button type="submit">Salvar</button>
      </form>

      <h2>📋 Lista de Clientes</h2>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <ul>
        {clientes.map((c, i) => (
          <li key={i}>
            <strong>{c.nome}</strong> — {c.cpf} — {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
