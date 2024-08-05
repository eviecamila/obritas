import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingCircle = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CircularProgress />
    </div>
  );
}

export default LoadingCircle;
