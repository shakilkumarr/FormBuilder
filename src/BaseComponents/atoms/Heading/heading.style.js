import styled from 'styled-components';

const FontBold = styled.div`
  font-family: 'LatoBold';
`;

export const Container = styled.div`
  display: flex;
`;

export const Heading1 = styled(FontBold)`
  font-size: 2.4rem;
  line-height: 2.9rem;
`;

export const Heading2 = styled(FontBold)`
  font-size: 2.1rem;
  line-height: 2.5rem;
`;

export const Heading3 = styled(FontBold)`
  font-size: 1.8rem;
  line-height: 2.2rem;
`;

export const Heading4 = styled(FontBold)`
  font-size: 1.6rem;
  line-height: 1.9rem;
`;

export const Heading5 = styled(FontBold)`
  font-size: 1.4rem;
  line-height: 1.7rem;
`;

export const Heading1Regular = styled(Heading1)`
  font-family: 'LatoRegular';
`;

export const Heading2Regular = styled(Heading2)`
  font-family: 'LatoRegular';
`;

export const Heading3Regular = styled(Heading3)`
  font-family: 'LatoRegular';
`;

export const Heading4Regular = styled(Heading4)`
  font-family: 'LatoRegular';
`;

export const Heading5Regular = styled(Heading5)`
  font-family: 'LatoRegular';
`;

export const RequiredLabel = styled.span`
  &::after {
    content: '*';
    font-size: 1.8rem;
    color: #F52908;
  }
`;
