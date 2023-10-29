import {
    TransferBatch as TransferBatchEvent,
    TransferSingle as TransferSingleEvent,
} from './generated/satoshi_gallery/ERC1155'
import { Transfer as TransferEvent } from './generated/digidaigaku/ERC721'
import { NftTransfer } from './generated/schema'

/**
 * Assembly Script:
 * - No closures
 * - No iterations (.entries(), .forEach(), for const of, ...)
 */

export function handleTransferBatch(event: TransferBatchEvent): void {
    const entity = new NftTransfer(
        event.transaction.hash.concatI32(event.logIndex.toI32()),
    )

    entity.contractAddress = event.address

    entity.operator = event.params.operator
    entity.from = event.params.from
    entity.to = event.params.to
    entity.tokenIds = event.params.ids
    entity.quantities = event.params.values

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.event = 'TransferBatch'

    entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
    const entity = new NftTransfer(
        event.transaction.hash.concatI32(event.logIndex.toI32()),
    )

    entity.contractAddress = event.address

    entity.operator = event.params.operator
    entity.from = event.params.from
    entity.to = event.params.to
    entity.tokenIds = [event.params.id]
    entity.quantities = [event.params.value]

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.event = 'TransferSingle'

    entity.save()
}

export function handleTransfer(event: TransferEvent): void {
    const entity = new NftTransfer(
        event.transaction.hash.concatI32(event.logIndex.toI32()),
    )

    entity.contractAddress = event.address

    entity.operator = event.params.from
    entity.from = event.params.from
    entity.to = event.params.to
    entity.tokenIds = [event.params.tokenId]
    entity.quantities = [1]

    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash

    entity.event = 'Transfer'

    entity.save()
}
