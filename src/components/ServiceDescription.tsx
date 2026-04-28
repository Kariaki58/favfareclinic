'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ServiceDescriptionProps {
  text: string;
  maxLength?: number;
}

export function ServiceDescription({ text, maxLength = 100 }: ServiceDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength) + (shouldTruncate ? '...' : '');

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {displayText}
      </p>
      {shouldTruncate && (
        <Button 
          variant="link" 
          className="p-0 h-auto text-primary text-xs self-start font-medium" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'See Less' : 'See More'}
        </Button>
      )}
    </div>
  );
}
