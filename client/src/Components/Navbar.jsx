import React, { useState ,useEffect} from 'react'
import { ethers } from 'ethers'
const Navbar = ({connect,disconnect,isWalletConnected,currentAccount}) => {
   

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">HabiToken</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/buy">Buy</a>
                        </li>
                    </ul>

                    <button className="btn btn-outline-success" type="button" onClick={async() => (isWalletConnected ? await disconnect() : await connect())}>
                    {isWalletConnected ? `Disconnect: ${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}` : "Connect"}
                </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar