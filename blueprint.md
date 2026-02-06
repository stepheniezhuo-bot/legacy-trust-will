# Legacy Planning Application Blueprint

## Overview

This document outlines the development plan for a Legacy Planning application. The application is designed to help Relationship Managers (RMs) guide their clients through the legacy planning process in a structured and user-friendly way. It will be a single-page web application.

## Current Implemented Features

*   **Client Discovery Form:** A web component (`<legacy-planning-form>`) that captures the client's basic profile, health information, and a financial snapshot.
*   **Corporate Styling:** The application is styled with a corporate color scheme of blue, green, and white.

## Current Request: Interactive Enhancements

This section outlines the plan to make the application more interactive and dynamic.

*   **Objective:** Enhance the user experience by providing real-time, personalized feedback based on the client's input.

### Implemented Enhancement: Conditional Legacy Checklist

*   **Description:** A new web component, `<legacy-checklist>`, will be introduced. This checklist will be dynamically displayed only when the client's marital status is set to "Single" or "Divorced".
*   **Rationale:** This provides targeted, relevant information to a specific user segment, making the tool more personalized and valuable.
*   **Implementation:**
    *   Create a `<legacy-checklist>` web component with items relevant to unmarried individuals (e.g., CPF nomination, will, LPA).
    *   Add an event listener to the "Marital Status" dropdown in the main form.
    *   Dynamically inject and remove the `<legacy-checklist>` component from the DOM based on the selected marital status.
