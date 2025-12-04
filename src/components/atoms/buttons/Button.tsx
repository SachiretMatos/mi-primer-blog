

// export default function Button() {

export const baseClasses = "bg-gray-900 border-2 border-fuchsia-500 text-cyan-400 hover:bg-fuchsia-600 hover:text-cyan-400 shadow-2xl [text-shadow:0_0_8px_rgb(232_121_249)] rounded-md  transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-fuchsia-500/70";

export default function Button() {
     return (
          <>
          <button className={baseClasses}  >
            Tocame las Bolas
          </button>
          <button className="bg-gray-900 border-2 px-2 mx-2 border-fuchsia-500/70 text-cyan-400 hover:bg-cyan-100/90 hover:text-cyan-400 shadow-2xl [text-shadow:0_0_8px_rgb(232_121_249)] rounded-md  transition-all duration-300 linear focus:outline-none focus:ring-4 focus:ring-cyan-500/70"  >
            Tocame las Bolas
          </button>
          </>
     );
}




// export default Button;