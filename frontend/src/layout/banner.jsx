import React from 'react'

const Banner = () => {
  return (
    <>
      <section id="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h4>Banner Title</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ut adipisci fugit rem porro provident impedit quasi repudiandae quia debitis.
              </p>
              <button className="btn btn-success">More Dettails...</button>
            </div>
            <div className="col-md-4">
              <img
                src="media/about-us.png"
                className="img-fluid d-block mx-auto"
                alt=""
                id="banner-img"
              />
            </div>
          </div>
        </div>
        <img src="media/border1.png" alt="" />
      </section>
    </>
  )
}

export default Banner
