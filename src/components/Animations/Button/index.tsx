import React from 'react';
import styles from './styles.module.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  isRipple?: boolean;
}

export default function Button(props: IButton) {
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add(styles.ripple);

    const ripple = button.getElementsByClassName(styles.ripple)[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button
      className={`btn ${props.className || ''} ${styles.rippleButton}`}
      onClick={(e) => { 
        if (props.isRipple) createRipple(e); 
        if (props.onClick) props.onClick(e); }}
      style={props.style}
    >
      {props.label}
    </button>
  );
}
