// Copyright 2020-2025 The MathWorks, Inc.

import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Help.css';

import {
    selectOverlayHidable,
    selectEnvConfig,
    selectIntegrationName
} from '../../selectors';

function Help ({
    closeHandler,
    dismissAllHandler
}) {
    const overlayHidable = useSelector(selectOverlayHidable);
    const integrationName = useSelector(selectIntegrationName);

    const onCloseClick = event => {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            dismissAllHandler();
        }
    };

    const envConfig = useSelector(selectEnvConfig);
    const url = envConfig.doc_url;

    return (
        <div className="modal show"
            id="help"
            onClick={overlayHidable
                ? onCloseClick
                : null}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="help-dialog-title">
            <div className="modal-dialog modal-dialog-centered"
                role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="confirmation-dialog-title">Help</h4>
                    </div>
                    <div className="modal-body help">
                        <p>The status panel shows you options to manage the <a href={url} target="_blank" rel="noopener noreferrer">{integrationName}</a>.</p>
                        <p>Use the buttons in the status panel to:</p>
                        <div>
                            <p className="icon-custom-start">Start your MATLAB session. Available if MATLAB is stopped.</p>
                            <p className="icon-custom-restart">Restart your MATLAB session. Available if MATLAB is running or starting.</p>
                            <p className="icon-custom-stop">Stop your MATLAB session. Use this option if you want to free up RAM and CPU resources. Available if MATLAB is running or starting.</p>
                            <p className="icon-custom-sign-out">
                                Sign out of MATLAB. Use this to stop MATLAB and to sign in with an alternative account. Available if using online licensing.<br />
                                Unset network license manager server address. Use this to stop MATLAB and enter new licensing information. Available if using network license manager.
                            </p>
                            <p className="icon-custom-shutdown">Stop your MATLAB session and MATLAB Proxy. </p>
                            <p className="icon-custom-feedback">{`Send feedback about the ${integrationName}. This action opens the matlab-proxy repository on github.com`}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={closeHandler} data-testid='backBtn' className="btn btn_color_blue">Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// TODO: If dismiss handler is required it causes weird failures in test
Help.propTypes = {
    closeHandler: PropTypes.func.isRequired,
    dismissAllHandler: PropTypes.func
};

export default Help;
