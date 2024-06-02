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

  const steps = [
    {
      title: 'Адрес',
      content: (
        <Form.Item label="Адрес" name="address">
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
            <Col span={12}>
              <Form.Item label="Улица" name={['address', 'street']}>
                <Input id="street" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Дом" name={['address', 'house']}>
                <Input id="house" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Корпус" name={['address', 'building']}>
                <Input id="building" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Квартира" name={['address', 'apartment']}>
                <Input id="apartment" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Телефон',
      content: (
        <Form.Item label="Телефон" name="phone">
          <Row gutter={[16, 16]}>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item
                label="Номер телефона"
                name={['phone', 'phone']}
                rules={[{ required: true, message: 'Пожалуйста, введите номер телефона' }]}
              >
                <Input id="phone" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Генеральный директор',
      content: (
        <Form.Item label="Генеральный директор" name="ceo">
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
              <Form.Item label="Дата рождения" name={['ceo', 'birthDate']}>
                <DatePicker id="ceoBirthDate" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Место рождения" name={['ceo', 'birthPlace']}>
                <Input id="ceoBirthPlace" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Гражданство" name={['ceo', 'citizenship']}>
                <Input id="ceoCitizenship" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Тип документа" name={['ceo', 'docType']}>
                <Input id="ceoDocType" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Номер документа" name={['ceo', 'docNumber']}>
                <Input id="ceoDocNumber" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Дата выдачи" name={['ceo', 'issueDate']}>
                <DatePicker id="ceoIssueDate" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Кем выдан" name={['ceo', 'issuedBy']}>
                <Input id="ceoIssuedBy" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Адрес" name={['ceo', 'address']}>
                <Input id="ceoAddress" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Телефон" name={['ceo', 'phone']}>
                <Input id="ceoPhone" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Лицензия',
      content: (
        <Form.Item label="Лицензия" name="license">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Тип лицензии"
                name={['license', 'type']}
                rules={[{ required: true, message: 'Пожалуйста, введите тип лицензии' }]}
              >
                <Input id="licenseType" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Номер лицензии"
                name={['license', 'number']}
                rules={[{ required: true, message: 'Пожалуйста, введите номер лицензии' }]}
              >
                <Input id="licenseNumber" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Дата выдачи" name={['license', 'issueDate']}>
                <DatePicker id="licenseIssueDate" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Кем выдан" name={['license', 'issuedBy']}>
                <Input id="licenseIssuedBy" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="Дата окончания" name={['license', 'expiryDate']}>
                <DatePicker id="licenseExpiryDate" />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item label="Описание" name={['license', 'description']}>
                <Input.TextArea id="licenseDescription" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Банковский счет',
      content: (
        <Form.Item label="Банковский счет" name="bankAccount">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Счет"
                name={['bankAccount', 'account']}
                rules={[{ required: true, message: 'Пожалуйста, введите номер счета' }]}
              >
                <Input id="account" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Кор. счет" name={['bankAccount', 'korAccount']}>
                <Input id="korAccount" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Название банка" name={['bankAccount', 'bankName']}>
                <Input id="bankName" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="БИК" name={['bankAccount', 'bik']}>
                <Input id="bik" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item label="КБК" name={['bankAccount', 'kbk']}>
                <Input id="kbk" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="ОКТМО" name={['bankAccount', 'oktmo']}>
                <Input id="oktmo" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Детали" name={['bankAccount', 'details']}>
                <Input id="details" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Налог" name={['bankAccount', 'tax']}>
                <Input id="tax" type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Фискализация',
      content: (
        <Form.Item label="Фискализация" name="fiscalization">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Название компании"
                name={['fiscalization', 'company']}
                rules={[{ required: true, message: 'Пожалуйста, введите название компании' }]}
              >
                <Input id="company" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="URL уведомлений"
                name={['fiscalization', 'notifyUrl']}
                rules={[{ required: true, message: 'Пожалуйста, введите URL уведомлений' }]}
              >
                <Input id="notifyUrl" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      ),
    },
    {
      title: 'Учредители',
      content: (
        <Form.Item label="Учредители" name="founders">
          <Row gutter={[16, 16]}>
            {founders.individuals.map((founder, index) => (
              <Col key={index} span={24}>
                <Form.Item label={`Учредитель ${index + 1}`}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Form.Item
                        label="Имя"
                        name={['founders', 'individuals', index, 'firstName']}
                        rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
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
                    <Col span={8}>
                      <Form.Item
                        label="Фамилия"
                        name={['founders', 'individuals', index, 'lastName']}
                        rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
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
                    <Col span={8}>
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
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
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
                          onChange={(e) =>
                            handleFounderChange(index, 'birthDate', e.format('YYYY-MM-DD'))
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
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
                    <Col span={8}>
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
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Form.Item
                        label="Тип документа"
                        name={['founders', 'individuals', index, 'docType']}
                      >
                        <Input
                          id={`docType-${index}`}
                          value={founder.docType}
                          onChange={(e) =>
                            handleFounderChange(index, 'docType', e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
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
                    <Col span={8}>
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
                          onChange={(e) =>
                            handleFounderChange(index, 'issueDate', e.format('YYYY-MM-DD'))
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
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
                    <Col span={8}>
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
                        onClick={() =>
                          setFounders({
                            individuals: founders.individuals.filter((_, i) => i !== index),
                          })
                        }
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
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      {/* <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps> */}
      <div style={{ marginTop: 24 }}>
        {current === steps.length - 1 ? (
          <Form layout="vertical" onSubmit={handleSubmit(onSubmit)}>
            {steps[current].content}
            <Form.Item>
                     {current > 0 && (
                <Button onClick={prev}>Предыдущий шаг</Button>
              ) 
              } 
              <Button type="primary" htmlType="submit">
                Зарегистрировать
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form layout="vertical">
            {steps[current].content}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 24,
              }}
            >
              {current > 0 && (
                <Button onClick={prev}>Предыдущий шаг</Button>
              ) 
              } 
              <Button onClick={next} type="primary">
                Следующий шаг
              </Button>
            </div>
          </Form>
           
        )}
      </div>
    </div>
  );
};

export { MarketplaceRegistrationPage };