import React, { useState, useEffect } from 'react';
import {AppWrapper,HeaderSection,BreadcrumbNav,BreadcrumbItem,ControlsBar,SearchInput,SortSelect,FileListContainer,FileItem,FileIcon,FileName,FileAddedDate,FileSize,
} from '../styledcomponents/StyledComponents';
import { data } from '../fileData';
import { formatBytes } from './bytes';

const FileExplorer = () => {
  const [fileStructure, setFileStructure] = useState(data);
  const [currentDir, setCurrentDir] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('name');
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [breadcrumbTrail, setBreadcrumbTrail] = useState([]);

  useEffect(() => {
    if (currentDir === null) {
      setBreadcrumbTrail([]);
    } else {
      setBreadcrumbTrail([...breadcrumbTrail, currentDir.name]);
    }
  }, [currentDir]);

  const sortFiles = (a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'size') {
      return a.size - b.size;
    } else if (sortCriteria === 'date') {
      return new Date(a.added) - new Date(b.added);
    }
    return 0;
  };

  const filterFiles = (file) => {
    const nameMatches = file.name.toLowerCase().includes(nameFilter.toLowerCase());
    const dateMatches = dateFilter
      ? new Date(file.added).toDateString() === new Date(dateFilter).toDateString()
      : true;
    return nameMatches && dateMatches;
  };

  const handleDirClick = (dir) => {
    setCurrentDir(dir);
  };

  const handleBreadcrumbClick = (index) => {
    const newBreadcrumbTrail = breadcrumbTrail.slice(0, index + 1);
    setCurrentDir(fileStructure.find((file) => file.name === newBreadcrumbTrail[index]));
    setBreadcrumbTrail(newBreadcrumbTrail);
  };

  const renderFile = (file) => {
    if (file.type === 'folder') {
      return (
        <FileItem key={file.name} className="folder" onClick={() => handleDirClick(file)}>
          <FileIcon>📂</FileIcon>
          <FileName>{file.name}</FileName>
        </FileItem>
      );
    } else {
      return (
        <FileItem key={file.name}>
          <FileIcon>📄</FileIcon>
          <FileName>{file.name}</FileName>
          <FileAddedDate>{file.added}</FileAddedDate>
          <FileSize>{formatBytes(file.size)}</FileSize>
        </FileItem>
      );
    }
  };

  return (
    <AppWrapper>
      <HeaderSection>
        <h1>BrightHR</h1>
        <BreadcrumbNav>
          {breadcrumbTrail.map((crumb, index) => (
            <BreadcrumbItem key={index} onClick={() => handleBreadcrumbClick(index)}>
              {crumb}
              {index < breadcrumbTrail.length - 1 && ' / '}
            </BreadcrumbItem>
          ))}
        </BreadcrumbNav>
        <ControlsBar>
          <SearchInput
            type="text"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <SearchInput
            type="date"
            placeholder="Filter by date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <SortSelect value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
            <option value="date">Sort by Date</option>
          </SortSelect>
        </ControlsBar>
      </HeaderSection>
      <FileListContainer>
        {currentDir ? (
          <div>
            <FileItem onClick={() => setCurrentDir(null)}>
              <FileIcon>↩️</FileIcon>
              <FileName>Back</FileName>
            </FileItem>
            {currentDir.files.filter(filterFiles).sort(sortFiles).map(renderFile)}
          </div>
        ) : (
          fileStructure.filter(filterFiles).sort(sortFiles).map(renderFile)
        )}
      </FileListContainer>
    </AppWrapper>
  );
};

export default FileExplorer;