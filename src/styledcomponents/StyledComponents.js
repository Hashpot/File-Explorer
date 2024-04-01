import styled from 'styled-components';

export const AppWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f7f7f7;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HeaderSection = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BreadcrumbNav = styled.div`
  margin: 0.5rem 0;
`;

export const BreadcrumbItem = styled.span`
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;

  &:hover {
    color: #333;
  }
`;

export const ControlsBar = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled.input`
  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background-color: #f7f7f7;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #666;
  }
`;

export const SortSelect = styled.select`
  margin-right: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background-color: #f7f7f7;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z' fill='%23333'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-right: 2rem;

  &:focus {
    border-color: #666;
  }
`;

export const FileListContainer = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
`;

export const FileItem = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 1fr 1fr;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5e5e5;
  }

  &.folder {
    font-weight: bold;
  }
`;

export const FileIcon = styled.span`
  margin-right: 0.5rem;
  color: #666;
`;

export const FileName = styled.span`
  text-align: left;
`;

export const FileAddedDate = styled.span`
  color: #666;
`;

export const FileSize = styled.span`
  color: #666;
`;