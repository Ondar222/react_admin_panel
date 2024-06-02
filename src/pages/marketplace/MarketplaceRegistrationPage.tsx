import React, { useState } from 'react';
import {
  AddressTypes,
  CountryCode,
  MarketplaceAddressType,
  Phone,
  Founders,
  IndividualFounder,
  CEO,
  License,
  BankAccount,
  Fiscalization,
  PhoneTypes,
} from './index'; // Импорт типов из вашего TS файла
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Layout as AntLayout,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  DatePicker,
  Space,
  Typography,
  Steps,
  // Step,
} from 'antd';
import styled from "styled-components"


export const Layout = styled(AntLayout)`
  background: #001529;
  display: flex;
  justify-content: center;
  align-items: center;
`



const { Title } = Typography;

const MarketplaceRegistrationPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<
    {
      address: MarketplaceAddressType;
      phone: Phone;
      ceo: CEO;
      license: License;
      bankAccount: BankAccount;
      fiscalization: Fiscalization;
      founders: Founders;
    }
  >();

  const [founders, setFounders] = useState<Founders>({
    individuals: [],
  });
  const [current, setCurrent] = useState(0);

  const handleFounderChange = (
    index: number,
    field: keyof IndividualFounder,
    value: string
  ) => {
    const newFounders = [...founders.individuals];
    newFounders[index][field] = value;
    setFounders({ individuals: newFounders });
  };

  const addFounder = () => {
    setFounders({
      individuals: [
        ...founders.individuals,
        {
          firstName: '',
          lastName: '',
          middleName: '',
          birthDate: '',
          birthPlace: '',
          citizenship: '',
          docType: '',
          docNumber: '',
          issueDate: '',
          issuedBy: '',
          address: '',
        },
      ],
    });
  };

  const removeFounder = (index: number) => {
    setFounders({
      individuals: founders.individuals.filter((_, i) => i !== index),
    });
  };

  const steps = [
    {
      title: 'Адрес',
      content: (
        <Form.Item style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          padding: "20px"
        }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Тип адреса"
                name={['address', 'type']}
                rules={[{ required: true, message: 'Пожалуйста, выберите тип адреса' }]}
              >
                <Select id="addressType">
                  <Select.Option value={AddressTypes.LEGAL}>Юридический</Select.Option>
                  <Select.Option value={AddressTypes.ACTUAL}>Фактический</Select.Option>
                  <Select.Option value={AddressTypes.POST}>Почтовый</Select.Option>
                  <Select.Option value={AddressTypes.OTHER}>Другой</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Индекс"
                name={['address', 'zip']}
                rules={[{ required: true, message: 'Пожалуйста, введите индекс' }]}
              >
                <Input id="zip" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Страна" name={['address', 'country']}>
                <Select id="country">
                  <Select.Option value={CountryCode.RUS}>Россия</Select.Option>
                  {/* Добавьте другие страны */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Город" name={['address', 'city']}>
                <Input id="city" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Улица" name={['address', 'street']}>
                <Input id="street" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Дом" name={['address', 'house']}>
                <Input id="house" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Квартира" name={['address', 'apartment']}>
                <Input id="apartment" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Корпус" name={['address', 'building']}>
                <Input id="building" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Телефон',
      content: (
        <Form.Item style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          padding: "20px"
        }} >
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Тип телефона"
                name={['phone', 'type']}
                rules={[{ required: true, message: 'Пожалуйста, выберите тип телефона' }]}
              >
                <Select id="phoneType">
                  <Select.Option value={PhoneTypes.COMMON}>Рабочий</Select.Option>
                  <Select.Option value={PhoneTypes.FAX}>Факс</Select.Option>
                  <Select.Option value={PhoneTypes.OTHER}>Другой</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Номер телефона"
                name={['phone', 'number']}
                rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
              >
                <Input id="phoneNumber" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Генеральный директор',
      content: (
        <Form.Item  style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          padding: "20px"
        }} name="ceo">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Имя"
                name={['ceo', 'firstName']}
                rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
              >
                <Input id="ceoFirstName" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item 
                label="Фамилия"
                name={['ceo', 'lastName']}
                rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
              >
                <Input id="ceoLastName" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Отчество" name={['ceo', 'middleName']}>
                <Input id="ceoMiddleName" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Должность" name={['ceo', 'position']}>
                <Input id="ceoPosition" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Лицензия',
      content: (
        <Form.Item  style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          padding: "20px"
        }} name="license">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Номер лицензии"
                name={['license', 'number']}
                rules={[{ required: true, message: 'Пожалуйста, введите номер лицензии' }]}
              >
                <Input id="licenseNumber" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Дата выдачи" name={['license', 'issueDate']}>
                <DatePicker id="licenseIssueDate" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Выдан" name={['license', 'issuedBy']}>
                <Input id="licenseIssuedBy" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Срок действия" name={['license', 'expirationDate']}>
                <DatePicker id="licenseExpirationDate" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Банковский счет',
      content: (
        <Form.Item style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          padding: "20px"
        }} name="bankAccount">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Номер счета"
                name={['bankAccount', 'number']}
                rules={[{ required: true, message: 'Пожалуйста, введите номер счета' }]}
              >
                <Input id="bankAccountNumber" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Банк" name={['bankAccount', 'bank']}>
                <Input id="bankAccountBank" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="БИК" name={['bankAccount', 'bic']}>
                <Input id="bankAccountBic" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Кор. счет" name={['bankAccount', 'correspondentAccount']}>
                <Input id="bankAccountCorrespondentAccount" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Фискализация',
      content: (
        <Form.Item style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          padding: "20px"
        }} name="fiscalization">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Form.Item
                label="Тип фискализации"
                name={['fiscalization', 'type']}
                rules={[{ required: true, message: 'Пожалуйста, выберите тип фискализации' }]}
              >
                <Select id="fiscalizationType">
                  {/* Добавьте опции типа фискализации */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Номер фискального документа"
                name={['fiscalization', 'fiscalDocumentNumber']}
                rules={[{ required: true, message: 'Пожалуйста, введите номер фискального документа' }]}
              >
                <Input id="fiscalDocumentNumber" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Дата выдачи" name={['fiscalization', 'issueDate']}>
                <DatePicker id="fiscalizationIssueDate" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Выдан" name={['fiscalization', 'issuedBy']}>
                <Input id="fiscalizationIssuedBy" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Учредители',
      content: (
        <Form.Item  style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          padding: "20px"
        }} name="founders">
          <Row gutter={[16, 16]}>
            {founders.individuals.map((founder, index) => (
              <Col key={index} span={24}>
                <Form.Item
                  label={`Учредитель ${index + 1}`}
                  key={index}
                  required
                  rules={[{ required: true, message: 'Пожалуйста, заполните информацию об учредителе' }]}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <Form.Item
                        label="Имя"
                        name={['founders', 'individuals', index, 'firstName']}
                      >
                        <Input
                          id={`firstName-${index}`}
                          value={founder.firstName}
                          onChange={(e) =>
                            handleFounderChange(index, 'firstName', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Фамилия"
                        name={['founders', 'individuals', index, 'lastName']}
                      >
                        <Input
                          id={`lastName-${index}`}
                          value={founder.lastName}
                          onChange={(e) =>
                            handleFounderChange(index, 'lastName', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Отчество"
                        name={['founders', 'individuals', index, 'middleName']}
                      >
                        <Input
                          id={`middleName-${index}`}
                          value={founder.middleName}
                          onChange={(e) =>
                            handleFounderChange(index, 'middleName', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Дата рождения"
                        name={['founders', 'individuals', index, 'birthDate']}
                      >
                        <DatePicker
                          id={`birthDate-${index}`}
                          value={
                            founder.birthDate
                              ? new Date(founder.birthDate)
                              : undefined
                          }
                          onChange={(date) =>
                            handleFounderChange(
                              index,
                              'birthDate',
                              date ? date.toISOString().slice(0, 10) : ''
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <Form.Item
                        label="Место рождения"
                        name={['founders', 'individuals', index, 'birthPlace']}
                      >
                        <Input
                          id={`birthPlace-${index}`}
                          value={founder.birthPlace}
                          onChange={(e) =>
                            handleFounderChange(index, 'birthPlace', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Гражданство"
                        name={['founders', 'individuals', index, 'citizenship']}
                      >
                        <Input
                          id={`citizenship-${index}`}
                          value={founder.citizenship}
                          onChange={(e) =>
                            handleFounderChange(index, 'citizenship', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Тип документа"
                        name={['founders', 'individuals', index, 'docType']}
                      >
                        <Select
                          id={`docType-${index}`}
                          value={founder.docType}
                          onChange={(value) =>
                            handleFounderChange(index, 'docType', value)
                          }
                        >
                          <Select.Option value="PASSPORT">Паспорт</Select.Option>
                          {/* Добавьте другие типы документов */}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Номер документа"
                        name={['founders', 'individuals', index, 'docNumber']}
                      >
                        <Input
                          id={`docNumber-${index}`}
                          value={founder.docNumber}
                          onChange={(e) =>
                            handleFounderChange(index, 'docNumber', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      <Form.Item
                        label="Дата выдачи"
                        name={['founders', 'individuals', index, 'issueDate']}
                      >
                        <DatePicker
                          id={`issueDate-${index}`}
                          value={
                            founder.issueDate
                              ? new Date(founder.issueDate)
                              : undefined
                          }
                          onChange={(date) =>
                            handleFounderChange(
                              index,
                              'issueDate',
                              date ? date.toISOString().slice(0, 10) : ''
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Кем выдан"
                        name={['founders', 'individuals', index, 'issuedBy']}
                      >
                        <Input
                          id={`issuedBy-${index}`}
                          value={founder.issuedBy}
                          onChange={(e) =>
                            handleFounderChange(index, 'issuedBy', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Адрес"
                        name={['founders', 'individuals', index, 'address']}
                      >
                        <Input
                          id={`address-${index}`}
                          value={founder.address}
                          onChange={(e) =>
                            handleFounderChange(index, 'address', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Button
                        danger
                        onClick={() => removeFounder(index)}
                      >
                        Удалить
                      </Button>
                    </Col>
                  </Row>
                  {/* ... Другие поля для учредителя ... */}
                </Form.Item>
              </Col>
            ))}
            <Col span={24}>
              <Space>
                <Button type="dashed" onClick={addFounder}>
                  Добавить учредителя
                </Button>
              </Space>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
  ];

  const onSubmit: SubmitHandler<any> = (data) => {
    // Обработка данных формы
    console.log(data);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <Layout>
      <AntLayout.Content style={{ padding: '50px' }}>
        <Title level={2} style={{
          color: "white",
        }}>Регистрация на маркетплейсе</Title>
        <Steps  style={{
              background: "white",
              padding: "20px",
              borderRadius: "5px 5px 0px 0px",
          
            }} current={current}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Далее
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit(onSubmit)}>
              Завершить
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={prev}>
              Назад
            </Button>
          )}
        </div>
      </AntLayout.Content>
    </Layout>
  );
};

export { MarketplaceRegistrationPage };