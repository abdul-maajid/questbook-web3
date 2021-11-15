// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721 {

	using Counters for Counters.Counter;
	Counters.Counter private _tokenIdCounter;    

    // URIs mapping
    mapping(uint => string) private _uris;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) { }

    function safeMint(address to, string memory uri) public returns (uint) {
        _tokenIdCounter.increment();
        _safeMint(to, _tokenIdCounter.current());

        // base URI for NFT. Must end with
        _uris[_tokenIdCounter.current()] = uri;
        return _tokenIdCounter.current();
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _uris[tokenId];
    }

}