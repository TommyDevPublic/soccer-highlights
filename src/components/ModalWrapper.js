import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const ModalWrapper = (props) => {

    const closeModal = () => {
        //history.push('/');
        history.goBack();
    };


        return ReactDOM.createPortal(
            <div>
                <div key="actions-modal" style={{display: 'block'}} className="modal fade bd-example-modal-lg show" id="actions-modal" tabIndex="-1" role="dialog"  aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

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
                <div className="modal-backdrop fade show" onClick={() => {closeModal()}}></div>
            </div>
            ,
            document.querySelector('#modal')
        )



}

export default ModalWrapper;