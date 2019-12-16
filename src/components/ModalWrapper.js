import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from "react-router-dom";

function ModalWrapper(props) {

    let history = useHistory();

    const closeModal = () => {
        history.push('/');
    };


        return ReactDOM.createPortal(
            <div>
                <div key="actions-modal" className="modal fade bd-example-modal-lg show" id="actions-modal" tabIndex="-1" role="dialog"  aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{props.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {closeModal()}}><span aria-hidden="true">×</span></button>
                            </div>
                            <div className="modal-body">
                                {props.content}
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show" onClick={() => closeModal()}></div>
            </div>
            ,
            document.querySelector('#modal')
        )



}

export default ModalWrapper;