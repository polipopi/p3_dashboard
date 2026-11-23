import { useMemo, useState } from 'react'
import { ShoppingBag, DollarSign, Users, TrendingUp, Search, ArrowUpRight } from 'lucide-react'

type Sale = { id: number; cliente: string; producto: string; categoria: string; fecha: string; total: number; estado: 'Completado' | 'Pendiente' }

const ventas: Sale[] = [
  { id: 1048, cliente: 'María López', producto: 'Audífonos inalámbricos', categoria: 'Tecnología', fecha: '23 nov 2026', total: 48.5, estado: 'Completado' },
  { id: 1047, cliente: 'Carlos Pérez', producto: 'Mochila urbana', categoria: 'Accesorios', fecha: '22 nov 2026', total: 32, estado: 'Pendiente' },
  { id: 1046, cliente: 'Ana Torres', producto: 'Lámpara de escritorio', categoria: 'Hogar', fecha: '21 nov 2026', total: 27.9, estado: 'Completado' },
  { id: 1045, cliente: 'Luis Vera', producto: 'Teclado inalámbrico', categoria: 'Tecnología', fecha: '20 nov 2026', total: 39.99, estado: 'Completado' },
  { id: 1044, cliente: 'Sofía Ruiz', producto: 'Botella térmica', categoria: 'Accesorios', fecha: '19 nov 2026', total: 18.75, estado: 'Pendiente' },
  { id: 1043, cliente: 'Pedro Mora', producto: 'Organizador', categoria: 'Hogar', fecha: '18 nov 2026', total: 22.4, estado: 'Completado' },
]

const meses = [
  { mes: 'Jun', valor: 42 }, { mes: 'Jul', valor: 58 }, { mes: 'Ago', valor: 49 },
  { mes: 'Sep', valor: 72 }, { mes: 'Oct', valor: 64 }, { mes: 'Nov', valor: 88 },
]

function App() {
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const filtradas = useMemo(() => ventas.filter(v =>
    (categoria === 'Todas' || v.categoria === categoria) &&
    (v.cliente.toLowerCase().includes(busqueda.toLowerCase()) || v.producto.toLowerCase().includes(busqueda.toLowerCase()))
  ), [categoria, busqueda])
  const total = filtradas.reduce((s, v) => s + v.total, 0)

  return <main className="page">
    <header className="topbar">
      <div><span className="eyebrow">PANEL DE CONTROL</span><h1>Resumen de ventas</h1><p>Revisa el rendimiento de tu tienda en un solo lugar.</p></div>
      <div className="date-chip">◷ &nbsp; Noviembre 2026</div>
    </header>

    <section className="stats">
      <article className="stat-card"><div className="stat-icon purple"><DollarSign size={20}/></div><div><span>Ventas registradas</span><strong>$12,480</strong><small className="positive"><TrendingUp size={13}/> 8.2% respecto al mes anterior</small></div></article>
      <article className="stat-card"><div className="stat-icon blue"><ShoppingBag size={20}/></div><div><span>Pedidos realizados</span><strong>248</strong><small className="positive"><TrendingUp size={13}/> 5.4% respecto al mes anterior</small></div></article>
      <article className="stat-card"><div className="stat-icon orange"><Users size={20}/></div><div><span>Clientes</span><strong>186</strong><small className="positive"><TrendingUp size={13}/> 12 nuevos este mes</small></div></article>
    </section>

    <section className="content-grid">
      <article className="panel chart-panel">
        <div className="panel-heading"><div><h2>Ventas por mes</h2><p>Ingresos de los últimos seis meses</p></div><span className="tag">2026</span></div>
        <div className="chart">
          <div className="y-labels"><span>$100</span><span>$75</span><span>$50</span><span>$25</span><span>$0</span></div>
          <div className="chart-area">
            {[100,75,50,25,0].map(n => <div className="grid-line" key={n} />)}
            <div className="bars">{meses.map(m => <div className="bar-wrap" key={m.mes}><div className="bar" style={{height: m.valor + '%'}} title={m.valor + ' cientos de dólares'}></div><span>{m.mes}</span></div>)}</div>
          </div>
        </div>
      </article>
      <article className="panel summary-panel">
        <div className="panel-heading"><div><h2>Resumen rápido</h2><p>Actividad de la tienda</p></div></div>
        <div className="summary-row"><span>Producto más vendido</span><strong>Audífonos</strong></div>
        <div className="summary-row"><span>Categoría destacada</span><strong>Tecnología</strong></div>
        <div className="summary-row"><span>Valor promedio</span><strong>$50.32</strong></div>
        <div className="summary-note"><ArrowUpRight size={18}/><span>Las ventas mantienen una tendencia positiva este mes.</span></div>
      </article>
    </section>

    <section className="panel table-panel">
      <div className="table-heading"><div><h2>Ventas recientes</h2><p>Consulta y filtra los últimos pedidos registrados.</p></div><div className="filters">
        <label className="search"><Search size={16}/><input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar cliente o producto"/></label>
        <select value={categoria} onChange={e => setCategoria(e.target.value)} aria-label="Filtrar por categoría"><option>Todas</option><option>Tecnología</option><option>Accesorios</option><option>Hogar</option></select>
      </div></div>
      <div className="table-scroll"><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Producto</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead>
        <tbody>{filtradas.map(v => <tr key={v.id}><td>#{v.id}</td><td className="customer">{v.cliente}</td><td>{v.producto}</td><td>{v.fecha}</td><td className="amount">${v.total.toFixed(2)}</td><td><span className={v.estado === 'Completado' ? 'status done' : 'status pending'}>{v.estado}</span></td></tr>)}
        {filtradas.length === 0 && <tr><td colSpan={6} className="empty">No se encontraron ventas.</td></tr>}</tbody>
      </table></div>
      <div className="table-footer"><span>Mostrando {filtradas.length} pedidos de ejemplo</span><strong>Total visible: ${total.toFixed(2)}</strong></div>
    </section>
    <footer>Dashboard académico · Datos ficticios para demostración</footer>
  </main>
}

export default App
