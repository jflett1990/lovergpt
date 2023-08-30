import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPartner from '@wasp/queries/getPartner';
import getInteractions from '@wasp/queries/getInteractions';
import logInteraction from '@wasp/actions/logInteraction';

export function HomePage() {
  const { data: partner, isLoading: partnerLoading, error: partnerError } = useQuery(getPartner);
  const { data: interactions, isLoading: interactionsLoading, error: interactionsError } = useQuery(getInteractions);
  const logInteractionFn = useAction(logInteraction);

  if (partnerLoading || interactionsLoading) return 'Loading...';
  if (partnerError || interactionsError) return 'Error: ' + (partnerError || interactionsError);

  const [interactionContent, setInteractionContent] = useState('');

  const handleLogInteraction = () => {
    logInteractionFn({ type: 'text', content: interactionContent });
    setInteractionContent('');
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl mb-2">Virtual Partner</h1>
        <div>{partner?.personality}</div>
        <div>{partner?.appearance}</div>
        <div>{partner?.mood}</div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl mb-2">Interactions</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your message"
            className="px-1 py-2 border rounded text-lg"
            value={interactionContent}
            onChange={(e) => setInteractionContent(e.target.value)}
          />
          <button
            onClick={handleLogInteraction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Send
          </button>
        </div>
        <div>
          {interactions.map((interaction) => (
            <div key={interaction.id} className="mb-2">
              <span className="text-xs text-gray-400">{new Date(interaction.timestamp).toLocaleString()}</span>
              <div>{interaction.content}</div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/customize" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Customize
      </Link>
    </div>
  );
}