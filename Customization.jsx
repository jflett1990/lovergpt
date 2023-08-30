import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';

// Import the necessary queries and actions
import { getInteractions, getPartner } from '@wasp/queries';
import { logInteraction } from '@wasp/actions';

export function Customization() {
  // Use the necessary queries and actions
  const { data: interactions, isLoading: interactionsLoading, error: interactionsError } = useQuery(getInteractions);
  const { data: partner, isLoading: partnerLoading, error: partnerError } = useQuery(getPartner);

  if (interactionsLoading || partnerLoading) return 'Loading...';
  if (interactionsError || partnerError) return 'Error: ' + (interactionsError || partnerError);

  const handleLogInteraction = () => {
    // Log the interaction using the logInteraction action
    logInteraction();
  };

  return (
    <div className='p-4'>
      // Customization page content
      {/* Use the partner and interactions data in your JSX */}
      <h1>{partner?.personality}</h1>
      <button onClick={handleLogInteraction}>Log Interaction</button>
      {/* Use the Link component to link to other pages */}
      <Link to='/dashboard'>Go to Dashboard</Link>
    </div>
  );
}