import { baseClasses } from '../buttons/Button.tsx'; 

export default function Lista() {
    return (
        <>
            <ul>
                <li className={baseClasses}>Bola 1</li>
                <li className={baseClasses}>Bola 2</li>
                <li className={baseClasses}>Bola 3</li>
            </ul>
        </>
    );
}