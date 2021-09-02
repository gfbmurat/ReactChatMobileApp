import React, { useState } from 'react'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import InputIcon from '@material-tailwind/react/InputIcon'
import { useWindowWidth } from '@react-hook/window-size'

const CreateChannelForm = ({ showModal, setShowModal }) => {

    const windowSize = useWindowWidth()

    return (
        <>
            <Modal size={windowSize > 480 ? 'md' : 'sm'} active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Kanal Oluştur
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal mb-4">
                        Arkadaşlarınızla konuşabileceğiniz herkese açık veya şifreli kanallar oluşturabilirsiniz.Kanalı oluşturan kişiden başkası silemez!
                    </p>
                    <div className="w-full mb-4 min-w-full">
                        <InputIcon
                            size="regular"
                            outline={true}
                            placeholder="Kanal Adı"
                            iconFamily="material-icons"
                            iconName="hashtag"
                        />
                    </div>
                    <InputIcon
                        size="regular"
                        outline={true}
                        placeholder="Kanal Açıklama"
                        iconFamily="material-icons"
                        iconName="description"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Cancel
                    </Button>

                    <Button
                        color="green"
                        onClick={(e) => setShowModal(false)}
                        ripple="light"
                    >
                        Create Channel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CreateChannelForm
