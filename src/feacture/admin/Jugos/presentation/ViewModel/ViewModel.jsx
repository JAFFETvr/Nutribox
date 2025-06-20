    import { use, useState } from "react";

    function ViewModel() {
        const [jugos, setJugos] = useState([]);
        const [nombre,setNombre] = useState('');
        const [precio,setPrecio] = useState(0);
        const [informacion,setInfomacion] = useState('');
        const [imagen,setImagen] = useState('');
        const [mostraModal,setMostrarModal] = useState(false);

        const abrirModal = () => {
            setMostrarModal(true);
        }

        const cerrarModal = () => {
            setMostrarModal(false);
        }

        const agregarJugo = (e) => {
            e.preventDefault();
            const nuevoJugo = {nombre,precio:Number(precio),informacion,imagen}
            setJugos([...jugos,nuevoJugo])
            console.log('nuevoJugo',nuevoJugo);
            
            setNombre(''),setInfomacion(''),setPrecio("0"),setImagen(''),setMostrarModal(false);
        }

        return{

        
            jugos,
            setJugos,
            nombre,
            setNombre,
            precio,
            setPrecio,
            informacion,
            setInfomacion,
            imagen,
            setImagen,
            mostraModal,
            setMostrarModal,
            abrirModal,
            cerrarModal,
            agregarJugo
    }


    }

    export default ViewModel;