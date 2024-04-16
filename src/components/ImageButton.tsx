import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

interface ImageActionButtonProps {
  imageUrl: string;
  onClick: () => void;
  alt: string;
}

const ImageActionButton: React.FC<ImageActionButtonProps> = ({ imageUrl, onClick, alt }) => {
  return (
    <Button variant="dark" onClick={onClick}>
      <Image src={imageUrl} alt={alt} fluid />
    </Button>
  );
};

export default ImageActionButton;