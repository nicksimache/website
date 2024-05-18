import {useState, useEffect} from 'react';

function Profile() {

    const  [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const profile_style = {
        width: width < 400 ? '100%' : '400px',
        height: '400px',
        boxSizing: 'border-box',
        position: 'relative',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
        
    };

    const title_header_style = {
        marginTop: '40px',
        width: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    };

    const name_style = {
        textAlign: 'center',
        fontFamily: 'LemonMilkLight, sans-serif',
        fontSize: '40px',
        margin: '0 auto'

    };

    const univerisity = {
        fontFamily: 'NunitoSans, sans-serif',
        fontSize: '10px',
        textAlign: 'left',
        marginLeft: '26.5px'
    }

    return (
        <div className="styled-div" style={profile_style}>
            <div style={title_header_style}>
                <a style={name_style}>
                    Nicholas Sima
                </a>
                <p style={univerisity}>
                    Computer Science and Mathematics @ University of Victoria
                </p>
            </div>
                
            <div>
                <a>
                    
                </a>
            </div>
        </div>
    );
}

export default Profile;