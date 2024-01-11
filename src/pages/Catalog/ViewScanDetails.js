import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal';
import { ChevronRight } from 'react-feather';
import { Objectify } from '../../helpers';
import { COLORS } from '../../constants';
import Button from '../../components/Button';

// const ViewDetailsButton = styled`

//   display: flex;
//   align-items: center;
//   border: none;
//   cursor: pointer;
//   background: transparent;
//   color: ${COLORS.primaryBlue};
//   font-family: 'Helvetica', sans-serif;
//     font-weight: 300;

 
// `;

const ModalContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ImageSection = styled.div`
  flex: 1;
  padding: 10px;
  img {
    width: 280px;
  }
`;

const DetailsSection = styled.div`
  flex: 1;
  padding: 10px;
`;

function ViewScanDetails({ scan }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    function parseString(string) {
      try {
        return JSON.parse(string.replace(/'/g, '"'));
      } catch (error) {
        console.error("OOOOOpsss error", string, error);
        return null;
      }
    }
    
  
    return (
      <div>
        <Button onClick={openModal} variant="secondary" iconfirst={true} >
          View Scan Details <ChevronRight size={10} style={{ marginLeft: '5px' }} />
        </Button>
        {isModalOpen && (
          <Modal closeDialog={closeModal} title={scan.name}>
            <ModalContent>
              <ImageSection>
                <img src={scan.thumb} alt={scan.name} style={{ maxWidth: '100%', height: 'auto' }} />
              </ImageSection>
              <DetailsSection>
                <h2>{scan.name}</h2>
                
                <div>{scan.manufacturer && (
										<span>{Objectify(scan.material).name}</span>
									)}</div>

                <div>{scan.colors && scan.colors.length > 0 
            ? scan.colors.map(string => {
                const colorObj = parseString(string);
                return colorObj ? colorObj.name : 'Invalid format';
              }).join(', ')
            : 'Not available'}</div>
									
              {scan.tags && scan.colors.length > 0 
            ? scan.tags.map(string => {
                const tagObj = parseString(string);
                return tagObj ? tagObj.name : 'Invalid format';
              }).join(', ')
            : 'Not available'}
              </DetailsSection>
            </ModalContent>
          </Modal>
        )}
      </div>
    );
  }

export default ViewScanDetails;
