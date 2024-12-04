


import GridViajes from "../componentes/GridViajes.jsx";
import GridComentariosViajes from "../componentes/GridComentariosViajes.jsx";

const Home = () => {
    const header = {
        title: "Bienvenido",
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        padding: '20px',

    };

    const titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    };





    return (
        <>

            <div style={containerStyle}>
                <h3 style={titleStyle}>{header.title}</h3>
                    <GridViajes />
                    <GridComentariosViajes />
            </div>
        </>
    );
};

export default Home;