import { Box, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AddNewPlan, SeeMore } from '../index';
import { PlansContext } from '../../contexts/Plans/PlansContext';

function CompletePlansCard() {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const {
        allPlans,
        search,
        editMenu,
        seeMore,
        handleSeeMore,
        handleEditMenu,
        toFile,
        isEditing,
    } = useContext(PlansContext);

    let unarchivedPlans = allPlans?.filter((plan) => !plan.archived);
    let filteredPlans =
        search.length > 0
            ? allPlans?.filter((plan) => plan.title.includes(search))
            : [];

    const pages = Math.ceil(unarchivedPlans?.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = unarchivedPlans?.slice(startIndex, endIndex);

    return (
        <>
            {search.length > 0
                ? filteredPlans?.map((plano) => (
                      <Box
                          key={plano._id}
                          sx={{
                              width: '100%',
                              padding: '25px 0',
                              borderBottom: '2px solid lightGray',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              overflowY: 'auto',
                              filter: editMenu || seeMore ? 'blur(10px)' : '',
                          }}
                      >
                          <Box
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'start',
                                  justifyContent: 'center',
                                  gap: '15px',
                              }}
                          >
                              <Box
                                  sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'start',
                                      gap: '25px',
                                  }}
                              >
                                  <Box
                                      sx={{
                                          width: '50px',
                                          height: '50px',
                                          backgroundColor: '#F5E0D9',
                                          borderRadius: '10px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                      }}
                                  >
                                      <img
                                          src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`}
                                          alt={plano.provider}
                                          style={{
                                              width: '80%',
                                              height: 'auto',
                                          }}
                                      />
                                  </Box>
                                  <Typography
                                      variant='h7'
                                      fontWeight='600'
                                      fontSize='1.125rem'
                                      fontFamily='Montserrat'
                                  >
                                      {plano.title}
                                  </Typography>
                              </Box>
                              <Box
                                  sx={{
                                      backgroundImage:
                                          "url('/assets/icons/polygon.svg')",
                                      backgroundPosition: 'center',
                                      backgroundSize: 'contain',
                                      backgroundRepeat: 'no-repeat',
                                      width: '40px',
                                      height: '40px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontFamily: 'Montserrat',
                                      fontSize: '1.25rem',
                                      color: '#D40066',
                                  }}
                              >
                                  {plano.priority}
                              </Box>
                          </Box>
                          <Box
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '15px',
                              }}
                          >
                              <Box
                                  sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      gap: '70px',
                                  }}
                              >
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          R${' '}
                                          {plano.cost
                                              .toFixed(2)
                                              .replace('.', ',')}
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Valor
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          {plano.franchise}GB
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Franquia
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          {plano.contacts}
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Contatos
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          {plano.createdAt
                                              .slice(0, 10)
                                              .split('-')
                                              .reverse()
                                              .join('/')}
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Criado em
                                      </Typography>
                                  </Stack>
                              </Box>
                              <Box
                                  sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'flex-end',
                                  }}
                              >
                                  <Stack
                                      sx={{
                                          flexDirection: 'row',
                                          gap: '25px',
                                      }}
                                  >
                                      <button
                                          style={{
                                              borderRadius: '10px',
                                              padding: '10px 15px',
                                              border: 'none',
                                              background: '#D40066',
                                              color: '#fff',
                                              fontWeight: 'medium',
                                              cursor: 'pointer',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '700',
                                              fontSize: '0.875rem',
                                          }}
                                          onClick={() => handleEditMenu(plano)}
                                      >
                                          Editar
                                      </button>
                                      <button
                                          style={{
                                              padding: '10px 15px',
                                              borderRadius: '10px',
                                              border: '2px solid #D40066',
                                              background: 'transparent',
                                              color: '#D40066',
                                              fontWeight: 'medium',
                                              cursor: 'pointer',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                          onClick={() => handleSeeMore(plano)}
                                          disabled={seeMore ? 'true' : ''}
                                      >
                                          Ver Detalhes
                                      </button>
                                      <button
                                          style={{
                                              padding: '10px 15px',
                                              borderRadius: '10px',
                                              border: '2px solid #D40066',
                                              background: 'transparent',
                                              color: '#D40066',
                                              fontWeight: 'medium',
                                              cursor: 'pointer',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                          onClick={() => toFile(plano)}
                                      >
                                          Arquivar
                                      </button>
                                  </Stack>
                              </Box>
                          </Box>
                      </Box>
                  ))
                : currentItems?.map((plano) => (
                      <Box
                          key={plano._id}
                          sx={{
                              width: '100%',
                              padding: '25px 0',
                              borderBottom: '2px solid lightGray',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              overflowY: 'auto',
                              filter: editMenu || seeMore ? 'blur(10px)' : '',
                          }}
                      >
                          <Box
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'start',
                                  justifyContent: 'center',
                                  gap: '15px',
                              }}
                          >
                              <Box
                                  sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'start',
                                      gap: '25px',
                                  }}
                              >
                                  <Box
                                      sx={{
                                          width: '50px',
                                          height: '50px',
                                          backgroundColor: '#F5E0D9',
                                          borderRadius: '10px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                      }}
                                  >
                                      <img
                                          src={`https://planos-backend.onrender.com/assets/${plano.providerLogo}`}
                                          alt={plano.provider}
                                          style={{
                                              width: '80%',
                                              height: 'auto',
                                          }}
                                      />
                                  </Box>
                                  <Typography
                                      variant='h7'
                                      fontWeight='600'
                                      fontSize='1.125rem'
                                      fontFamily='Montserrat'
                                  >
                                      {plano.title}
                                  </Typography>
                              </Box>
                              <Box
                                  sx={{
                                      backgroundImage:
                                          "url('/assets/icons/polygon.svg')",
                                      backgroundPosition: 'center',
                                      backgroundSize: 'contain',
                                      backgroundRepeat: 'no-repeat',
                                      width: '40px',
                                      height: '40px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontFamily: 'Montserrat',
                                      fontSize: '1.25rem',
                                      color: '#D40066',
                                  }}
                              >
                                  {plano.priority}
                              </Box>
                          </Box>
                          <Box
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '15px',
                              }}
                          >
                              <Box
                                  sx={{
                                      display: 'flex',
                                      justifyContent: 'flex-end',
                                      gap: '70px',
                                  }}
                              >
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          R${' '}
                                          {plano.cost
                                              .toFixed(2)
                                              .replace('.', ',')}
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Valor
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          {plano.franchise}GB
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Franquia
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          {plano.contacts}
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Contatos
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <Typography
                                          variant='h7'
                                          fontWeight='500'
                                          fontSize='1.125rem'
                                          fontFamily='Montserrat'
                                          color='#252525'
                                      >
                                          {plano.createdAt
                                              .slice(0, 10)
                                              .split('-')
                                              .reverse()
                                              .join('/')}
                                      </Typography>
                                      <Typography
                                          variant='span'
                                          sx={{
                                              color: '#b0b0b0',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                      >
                                          Criado em
                                      </Typography>
                                  </Stack>
                              </Box>
                              <Box
                                  sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'flex-end',
                                  }}
                              >
                                  <Stack
                                      sx={{
                                          flexDirection: 'row',
                                          gap: '25px',
                                      }}
                                  >
                                      <button
                                          style={{
                                              borderRadius: '10px',
                                              padding: '10px 15px',
                                              border: 'none',
                                              background: '#D40066',
                                              color: '#fff',
                                              fontWeight: 'medium',
                                              cursor: 'pointer',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '700',
                                              fontSize: '0.875rem',
                                          }}
                                          onClick={() => handleEditMenu(plano)}
                                      >
                                          Editar
                                      </button>
                                      <button
                                          style={{
                                              padding: '10px 15px',
                                              borderRadius: '10px',
                                              border: '2px solid #D40066',
                                              background: 'transparent',
                                              color: '#D40066',
                                              fontWeight: 'medium',
                                              cursor: 'pointer',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                          onClick={() => handleSeeMore(plano)}
                                          disabled={seeMore ? 'true' : ''}
                                      >
                                          Ver Detalhes
                                      </button>
                                      <button
                                          style={{
                                              padding: '10px 15px',
                                              borderRadius: '10px',
                                              border: '2px solid #D40066',
                                              background: 'transparent',
                                              color: '#D40066',
                                              fontWeight: 'medium',
                                              cursor: 'pointer',
                                              fontFamily: 'Montserrat',
                                              fontWeight: '500',
                                              fontSize: '0.875rem',
                                          }}
                                          onClick={() => toFile(plano)}
                                      >
                                          Arquivar
                                      </button>
                                  </Stack>
                              </Box>
                          </Box>
                      </Box>
                  ))}
            {search.length === 0 ? (
                <Box
                    sx={{
                        marginTop: '50px',
                        width: '100%',
                        height: '50px',
                        display: isEditing ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px',
                    }}
                >
                    {Array.from(Array(pages), (item, index) => {
                        return (
                            <button
                                value={index}
                                key={index}
                                onClick={(e) =>
                                    setCurrentPage(Number(e.target.value))
                                }
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    border: 'none',
                                    color:
                                        currentPage === index
                                            ? '#fff'
                                            : '#D40066',
                                    background:
                                        currentPage === index
                                            ? '#D40066'
                                            : '#fff',
                                    borderRadius: '8px',
                                    border: '2px solid #D40066',
                                }}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </Box>
            ) : null}
            {editMenu && <AddNewPlan menuTitle={'Editar Plano'} />}
            {seeMore && <SeeMore />}
        </>
    );
}

export default CompletePlansCard;

//TODO adicionar função para mostrar em qual pagina esta
