import React, { useState } from 'react';

interface DepositProps {
    onDeposit: (amount: number, accountType: 'checking' | 'savings') => void;
}

const Deposit: React.FC<DepositProps> = ({ onDeposit }) => {
    const [amount, setAmount] = useState<number>(0);
    const [accountType, setAccountType] = useState<'checking' | 'savings'>('checking');
    const [error, setError] = useState<string>('');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setAmount(isNaN(value) ? 0 : value);
    };

    const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAccountType(e.target.value as 'checking' | 'savings');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        setError('');
        onDeposit(amount, accountType);
        setAmount(0); // Reset amount after deposit
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Deposit Money</h2>
            <div>
                <label>
                    Amount:
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={handleAmountChange} 
                        required 
                    />
                </label>
            </div>
            <div>
                <label>
                    Account Type:
                    <select value={accountType} onChange={handleAccountChange}>
                        <option value="checking">Checking</option>
                        <option value="savings">Savings</option>
                    </select>
                </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Deposit</button>
        </form>
    );
};

export default Deposit;
