import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";

// Material-UI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


import { UserContext } from '../../context/UserContext';
import * as FaqAPI from '../../lib/FaqAPI';
import { multiLine } from '../../config';

// Modal
import UpdateModal from '../../components/modal/UpdateModal';


const FaqAccordion = ({ user, faqs, onUpdate, onDelete, onHide }) => {

  const is_show_faq = faqs?.filter(faq => faq.flg); //一般ユーザー用のリスト
  const faqList = user.is_staff ? faqs : is_show_faq;

  return (
    faqList?.map(faq => {
      return (
        <Box key={ faq.id } sx={{ margin: 1, width: '75%', display: 'flex', flexDirection: 'column', }}>
          { 
            user.is_staff
            ? <Box>
                <Button type="button" variant="outlined" size="small" sx={{ mx: 1 }} onClick={ () => onUpdate(faq) }>UPDATE</Button>
                <Button type="button" variant="outlined" size="small" color="error" sx={{ mx: 1 }} onClick={ () => onDelete(faq.id) }>DELETE</Button>
                {
                  faq.flg
                  ? <Button type="button" variant="outlined" size="small" sx={{ mx: 1 }} onClick={ () => onHide(faq) } color="secondary">HIDE</Button>
                  : <Button type="button" variant="outlined" size="small" sx={{ mx: 1 }} onClick={ () => onHide(faq) } color="secondary">SHOW</Button>
                }
                
              </Box>
            : null
          }
          <Accordion sx={{ flexGrow: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">{ faq.title }</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              { multiLine(faq.content) }
            </AccordionDetails>
          </Accordion>
        </Box>
      )
    })
  );
}

const modalTextFieldList = [
  {name: "title", label: "TITLE"},
  {name: "content", label: "CONTENT", rows: 4}
];

const baseFaq = { title: "", content: "", flg: true};

const Faq = () => {
  const path = useLocation(); // 現在path
  const { token, user } = useContext(UserContext);

  const [ faq, setFaq ] = useState(baseFaq);
  const [ faqs, setFaqs ] = useState([]);

  const [ showModal, setShowModal ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState('');
  const [ modalTextField, ] = useState(modalTextFieldList);
  const [ modalSubmit, setModalSubmit ] = useState({btnName: "", color: "", onSubmit: ''});

  useEffect(() => {
    // FAQ List取得
    const faqs = async () => {
      const response = await FaqAPI.get_faqs(path.pathname);
      if (response.status === 200) {
        const data = await response.json();
        setFaqs(data);
      } else {
        console.log("error")
      }
    }
    faqs();
  }, [path, user])

  const closeModal = () => {
    setShowModal(false);
    setFaq(baseFaq);
  }

  const onCreate = e => {
    e.preventDefault();
    // modal情報登録
    setModalTitle("CREATE FAQ");
    setModalSubmit({ btnName: "CREATE", color: "primary", onSubmit: onSubmitCreate });
    setShowModal(prev => !prev);
  }

  // FAQ登録
  const onSubmitCreate = async _faq => {
    setShowModal(prev => !prev);
    const response = await FaqAPI.create_faq(path.pathname, token, _faq);
    const data = await response.json();
    if (response.status === 200) {
      setFaqs(data);
    }
  }

  const onUpdate = _faq => {
    setFaq(faqs?.find(faq => faq.id === _faq.id));
    setModalTitle("UPDATE FAQ");
    setModalSubmit({ btnName: "UPDATE", color: "primary", onSubmit: onSubmitUpdate });
    setShowModal(prev => !prev);
  }

  const onSubmitUpdate = async _faq => {
    setShowModal(prev => !prev);
    const response = await FaqAPI.update_faq(path.pathname, token, _faq);
    const data = await response.json();
    if (response.status === 200) {
      const reObj = faqs?.map(faq => {
        var rObj = {};
        rObj = faq;
        if (faq.id === data.id) {
          rObj = data;
        }
        return rObj;
      });
      setFaqs(reObj);
    }
  }

  const onSubmitDelete = async id => {
    const response = await FaqAPI.delete_faq(path.pathname, token, id);
    const data = await response.json();
    if (response.status === 200) {
      setFaqs(data);
    }
  }

  const onSubmitHide = async _faq => {
    _faq.flg = !_faq.flg;
    const response = await FaqAPI.update_faq(path.pathname, token, _faq);
    if (response.status === 200) {
      const reObj = faqs?.map(faq => {
        var rObj = {};
        rObj = faq;
        return rObj;
      });
      setFaqs(reObj);
    }
  }

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* 登録ボタン */}
        {
          user.is_staff
          ? <Button type="button" variant="outlined" sx={{ mb: 1 }} size="small" onClick={ onCreate } >CREATE</Button>
          : null 
        }
        {/* TITLE */}
        <Typography component="h1" variant="h4">FAQ</Typography>
        {/* FAQ Listを表示する */}
        <FaqAccordion user={ user } faqs={ faqs } onUpdate={ onUpdate } onDelete={ onSubmitDelete } onHide={ onSubmitHide } />
      </Box>

      <UpdateModal 
        modalTitle={ modalTitle }
        modalTextField={ modalTextField }
        defaultData={ faq }
        onSubmit={ modalSubmit }

        open={ showModal }
        handleClose={ closeModal }
        token={ token }
      />
    </Container>
  );
}

export default React.memo(Faq);
