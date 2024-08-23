// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract WalletContract {
    uint256 private constant MIN = 10000000000000000; // 0.01
    address private constant HOT_WALLET =
        0xBB41e40C3FF63119749c2b13f0B3e119fbA50e4E;

    event DepositedOnMetaDapp();

    function forward() private {
        if (msg.value >= MIN) {
            (bool success, ) = payable(HOT_WALLET).call{
                value: address(this).balance
            }("");
            require(success);
            emit DepositedOnMetaDapp();
        }
    }

    receive() external payable {
        forward();
    }
    fallback() external payable {
        forward();
    }
}
