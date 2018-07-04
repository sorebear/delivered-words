import React from 'react';

export default ({ key, enabled, children, className, onClick }) => {
  if (enabled) {
    return (
      <button key={key} className={className} onClick={onClick}>
        { children }
      </button>
    )
  } 
  
  return (
    <button key={key} className={className} disabled>
      { children }
    </button>
  )
}