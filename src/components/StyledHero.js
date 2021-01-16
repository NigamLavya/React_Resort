import defaultHeroImage from '../images/room-1.jpeg'
import styled from 'styled-components'

const StyledHero = styled.header`
  background: url(${props=>props.heroURL || defaultHeroImage}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export default StyledHero;