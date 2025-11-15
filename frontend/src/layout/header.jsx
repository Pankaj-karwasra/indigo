import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <section id="header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                  <Link className="navbar-brand" to="/">
                    <img src="media/logo.png" alt="Logo" />
                  </Link>

                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i className="bi bi-list"></i>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/service">
                          Service
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/testimonial">
                          Testimonial
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/team">
                          Team
                        </Link>
                      </li>
                    </ul>

                 
                   
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
