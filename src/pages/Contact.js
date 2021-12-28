import React from "react";
import SubHeader from "../components/Global/SubHeader/SubHeader";

export default function Contact() {
  return (
    <>
      <SubHeader name={"Contact Us"} />
      <div className="container my-5">
        <form class="row g-3 mx-auto" style={{maxWidth: '600px'}}>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              Name
            </label>
            <input type="text" class="form-control" id="inputEmail4" />
          </div>
          <div class="col-md-6">
            <label  class="form-label">
              Email
            </label>
            <input type="email" class="form-control" />
          </div>
          <div class="col-12">
            <label  class="form-label">
              Subject
            </label>
            <input
              type="text"
              class="form-control"
            />
          </div>
          <div class="col-12">
            <label for="inputAddress2" class="form-label">
             Message
            </label>
            <textarea
              type="text"
              class="form-control"
              row="3"
            />
          </div>
          <button className="btn btn-success text-white">Send</button>
        </form>
      </div>
    </>
  );
}
