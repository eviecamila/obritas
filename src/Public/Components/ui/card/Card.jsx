// src/Public/Components/ui/Card.js
import React from 'react';

export const Card = ({ children }) => (
  <div className="border rounded shadow-md">{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);