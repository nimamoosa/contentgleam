import { useController } from '@/contexts/controllerContext'
import { ChatTypes } from '@/types/chat'
import { inputModels } from '@/utils/inputModels'
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem
} from '@nextui-org/react'

interface props {
    userChat: ChatTypes | null
}

export default function Config({ userChat }: props) {
    const { showModel, setShowModel, configSelect, setConfigSelect } =
        useController()

    const inputs = inputModels[userChat?.model || ''] || []

    const getSelectOptions = (options: string[] | undefined) => {
        return options || []
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
        names: string = '',
        option?: string[]
    ) => {
        const { name, value } = e.target

        setConfigSelect((prev) => ({
            ...prev,
            [name || names]: option
                ? `${option[Number(value)]},${value || '0'}`
                : value
        }))
    }

    const renderModelBody = () => {
        return inputs.map((it, idx) => {
            if (it.type === 'input') {
                return (
                    <Input
                        key={it.name + idx} // Ensure unique key for each input
                        placeholder={it.placeholder}
                        value={
                            configSelect[
                                it.name as keyof typeof configSelect
                            ] || ''
                        }
                        name={it.name}
                        onChange={handleChange}
                    />
                )
            }

            if (it.type === 'select') {
                const options = getSelectOptions(it.options)

                return (
                    <Select
                        key={idx}
                        label={it.placeholder}
                        selectedKeys={
                            configSelect[
                                it.name as keyof typeof configSelect
                            ] &&
                            configSelect[
                                it.name as keyof typeof configSelect
                            ].split(',')[1]
                        }
                        onChange={(e) => handleChange(e, it.name, options)}
                        className="max-w-xs">
                        {options.map((option, optionIndex) => (
                            <SelectItem key={optionIndex}>{option}</SelectItem>
                        ))}
                    </Select>
                )
            }

            return null
        })
    }

    return (
        <Modal isOpen={showModel} onOpenChange={setShowModel}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Config
                        </ModalHeader>
                        <ModalBody>{renderModelBody()}</ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
