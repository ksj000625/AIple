import * as React from 'react';
// import "../styles/Searchbar.css"
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close'
import {useState} from "react";

const SearchBar = ({data})=>{
    const[filterData, setFilterData] = useState([]);
    const[wordEntered, setWordEntered] = useState("");

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord)
        const newFilter = data.filter((value)=>{
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        })

        if(searchWord === ""){
            setFilterData([]);
        }else{
            setFilterData(newFilter);
        }
    }

    const clearInput = () =>{
        setFilterData([]);
        setWordEntered("");
    }

    return (
        <Search>
            <SearchInput>
                <input type="text" placeholder="Enter a product name..." onChange={handleFilter} value={wordEntered}/>
                {filterData.length === 0 ? <SearchIcon className='icon'/> : <CloseIcon className='icon' onClick={clearInput}/>}
            </SearchInput>
            {
                filterData.length !== 0 && (
                    <DataResult>
                        {filterData.slice(0, 15).map((product, key)=>{
                            return(
                                <a key={key} className='dataItem' href={product.image} target="_blank">
                                    <p>{product.title}</p>
                                </a>
                            )
                        })}
                    </DataResult>
                )
            }
        </Search>
    );
};

export default SearchBar

const Search = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.div`
  margin-top: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 400px;
  height: 30px;
  padding: 20px;

  input{
    border: none;
  }
  input:focus{
    outline: none;
  }

  .icon{
    cursor: pointer;
  }
`;

const DataResult = styled.div`
  width: 396px;
  height: 200px;
  background-color: #fff;
  box-shadow: rgba(0,0,0,.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 5px;
  border-radius: 5px;

  .dataItem{
    padding: 0 10px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .dataItem:hover{
    background-color: gray;
    color: #fff;
  }
`;