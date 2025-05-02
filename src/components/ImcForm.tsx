    import { useState } from 'react';
    import styles from './Imc.module.css';

    interface ResultadoIMC {
    imc: string; // ← toFixed retorna string
    classificacao: string;
    }

    export default function ImcForm() {
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const [resultado, setResultado] = useState<ResultadoIMC | null>(null);
    const [erro, setErro] = useState('');

    const calcularIMC = () => {
        setErro('');
        try {
        const alturaNum = parseFloat(altura);
        const pesoNum = parseFloat(peso);

        if (isNaN(alturaNum) || alturaNum <= 0 || alturaNum > 2.5) {
            throw new Error();
        }
        if (isNaN(pesoNum) || pesoNum <= 0 || pesoNum > 300) {
            throw new Error();
        }

        const imc = pesoNum / (alturaNum * alturaNum);
        let classificacao = '';

        if (imc < 18.5) classificacao = 'Abaixo do peso';
        else if (imc < 24.9) classificacao = 'Peso normal';
        else if (imc < 29.9) classificacao = 'Sobrepeso';
        else if (imc < 34.9) classificacao = 'Obesidade grau 1';
        else if (imc < 39.9) classificacao = 'Obesidade grau 2';
        else classificacao = 'Obesidade grau 3';

        setResultado({ imc: imc.toFixed(2), classificacao });
        } catch (err) {
        setErro('Informe o dado acima solicitado');
        setResultado(null);
        }
    };

    return (
        <div className={styles.container}>
        <div className={styles.form}>
            <h2>Calculadora de IMC</h2>
            <label>
            Altura (ex: 1.75 m):
            <input
                type="text"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Digite sua altura"
            />
            </label>
            <label>
            Peso (ex: 70 kg):
            <input
                type="text"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Digite seu peso"
            />
            </label>
            <button onClick={calcularIMC}>Calcular IMC</button>

            {erro && <p className={styles.erro}>{erro}</p>}

            {resultado && (
            <div className={styles.tabela}>
                <h3>Resultado</h3>
                <p><strong>IMC:</strong> {resultado.imc}</p>
                <p><strong>Classificação:</strong> {resultado.classificacao}</p>

                <table>
                <thead>
                    <tr>
                    <th>IMC</th>
                    <th>Classificação</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Menor que 18.5</td><td>Abaixo do peso</td></tr>
                    <tr><td>18.5 - 24.9</td><td>Peso normal</td></tr>
                    <tr><td>25 - 29.9</td><td>Sobrepeso</td></tr>
                    <tr><td>30 - 34.9</td><td>Obesidade grau 1</td></tr>
                    <tr><td>35 - 39.9</td><td>Obesidade grau 2</td></tr>
                    <tr><td>Maior que 40</td><td>Obesidade grau 3</td></tr>
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
    }
