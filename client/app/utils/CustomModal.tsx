/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import {Box, Modal} from "@mui/material";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (route: string) => void;
    refetch?: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomModal: FC<Props> = ({open, setOpen, activeItem, component:Component, setRoute, refetch}) => {
  return (
  <div>
    <Modal
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none'>
        <Component setOpen={setOpen} setRoute={setRoute}  refetch={refetch} />
      </Box>
    </Modal>
  </div>
  )
}

export default CustomModal;