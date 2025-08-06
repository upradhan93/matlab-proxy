// Copyright 2020-2025 The MathWorks, Inc.

import React from 'react';
import App from '../App';
import Help from './index';
import { render } from '../../test/utils/react-test';
import { fireEvent } from '@testing-library/react';
import * as actionCreators from '../../actionCreators';

import state from '../../test/utils/state';

const _ = require('lodash');

describe('Help Component', () => {
    let closeHandler, initialState;
    beforeEach(() => {
        closeHandler = vi.fn().mockImplementation(() => { });
        initialState = _.cloneDeep(state);
        initialState.serverStatus.licensingInfo.entitlements = [initialState.serverStatus.licensingInfo.entitlements[0]];
        initialState.serverStatus.licensingInfo.entitlementId = initialState.serverStatus.licensingInfo.entitlements[0].id;
    });
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should throw console.error for not passing in prop types', () => {
        const errorMock = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(<Help />, {
            initialState
        });
        expect(errorMock).toHaveBeenCalledTimes(1);
    });

    it('should render without crashing', () => {
        render(<Help closeHandler={closeHandler} />, {
            initialState
        });
    });

    it('should fire onClose event of Help modal when Back button is clicked', () => {
        const { getByTestId } = render(
            <Help closeHandler={closeHandler} />, {
                initialState
            });

        const backButton = getByTestId('backBtn');

        fireEvent.click(backButton);

        expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it('should close the Help Modal and display Information component when Back button is clicked', () => {
        const mockFetchServerStatus = vi.spyOn(actionCreators, 'fetchServerStatus').mockImplementation(() => {
            return () => Promise.resolve();
        });
        // Hide the tutorial and make the overlay visible.
        initialState.tutorialHidden = true;
        initialState.overlayVisibility = true;

        // Rendering the App component with the above changes to the initial
        // state should render the Information Component.
        const { getByTestId, container } = render(<App />, {
            initialState
        });

        // Grab and click on the Help Button
        const helpButton = getByTestId('helpBtn');
        fireEvent.click(helpButton);

        const helpComponent = container.querySelector('#help');

        // Check if Help dialog is rendered.
        expect(helpComponent).toBeInTheDocument();

        // Grab and click on the Back button in the help Component.
        const backButton = getByTestId('backBtn');
        fireEvent.click(backButton);

        // The Help dialog should disappear
        expect(helpComponent).not.toBeInTheDocument();
        mockFetchServerStatus.mockRestore();            
    });

    it('should call onClick function', () => {
        const { getByRole } = render(
            // pass mock function to dismissAllHandler for testing onClick
            <Help closeHandler={() => {}} dismissAllHandler={closeHandler} />,
            { initialState }
        );

        const modal = getByRole('dialog');

        fireEvent.click(modal);

        expect(closeHandler).toHaveBeenCalledTimes(1);
    });
});
