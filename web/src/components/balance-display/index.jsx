import './styles.css'

export function BalanceDisplay({ balanceData }) {
    if (!balanceData) return null

    const formatCurrency = (value) => {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    return (
        <div className="balance-grid">
            <div className="balance-card main">
                <header>
                    <span className="label">Saldo Atual</span>
                    <span className="icon">💰</span>
                </header>
                <div>
                    <strong className="value">
                        {formatCurrency(balanceData.balance)}
                    </strong>
                    <div className="sub-text">~ Conta Principal</div>
                </div>
            </div>

            <div className="balance-card earning">
                <header>
                    <span className="label">Total de Entradas</span>
                    <span className="icon">↑</span>
                </header>
                <div>
                    <strong className="value">
                        {formatCurrency(balanceData.earnings)}
                    </strong>
                    <div className="sub-text">Receitas recebidas</div>
                </div>
            </div>

            <div className="balance-card expense">
                <header>
                    <span className="label">Total de Saídas</span>
                    <span className="icon">↓</span>
                </header>
                <div>
                    <strong className="value">
                        {formatCurrency(balanceData.expenses)}
                    </strong>
                    <div className="sub-text">Despesas pagas</div>
                </div>
            </div>

            <div className="balance-card investment">
                <header>
                    <span className="label">Total Investido</span>
                    <span className="icon">✨</span>
                </header>
                <div>
                    <strong className="value">
                        {formatCurrency(balanceData.investments)}
                    </strong>
                    <div className="sub-text">Patrimônio em ativos</div>
                </div>
            </div>
        </div>
    )
}
