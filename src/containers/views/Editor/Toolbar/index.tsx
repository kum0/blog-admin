import * as React from 'react';
import { Select, Radio, Button, Modal } from 'antd';
import { inject, observer } from 'mobx-react';
import styled from '@/styles';
import { ActionGroup } from '@/components/common';
import ClassificationModal from './ClassificationModal';

import { SelectValue } from 'antd/lib/select';
import { RadioChangeEvent } from 'antd/lib/radio';
// import { Moment } from 'moment';
// import * as moment from 'moment';

const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const ActionItem = ActionGroup.ActionItem;
const ActionLine = ActionGroup.ActionLine;

interface IToolbarProps extends IClassName {
  changeEdit: GlobalStore.IChangeEdit;
  selectionEdit: string;
  webConfig: GlobalStore.IWebConfig;
  changeLanguages: GlobalStore.IChangeLanguages;
  selectionLanguage: string;
  isUploadDisplay: boolean;
  uploadDisplay: GlobalStore.IUploadDisplay;
  classification: ArticleStore.IClassNames[];
  addClassification: ArticleStore.IAddClassification;
  sortClassification: ArticleStore.ISortClassification;
  updateClassification: ArticleStore.IUpdateClassification;
  removeClassification: ArticleStore.IRemoveClassification;
  article: ArticleStore.IArticle;
  changeArticle: ArticleStore.IChangeArticle;
  saveArticle: () => void;
  publishArticle: () => void;
  restore: () => void;
  editorLanguages: string[];
}

interface IToolbarState {
  visible: boolean;
}

@inject(
  (store: IStore): IToolbarProps => {
    const {
      changeEdit,
      selectionEdit,
      webConfig,
      changeLanguages,
      selectionLanguage,
      isUploadDisplay,
      uploadDisplay,
      editorLanguages
    } = store.globalStore;
    const {
      classification,
      addClassification,
      sortClassification,
      updateClassification,
      removeClassification,
      article,
      changeArticle,
      saveArticle,
      publishArticle,
      restore
    } = store.articleStore;
    return {
      changeEdit,
      selectionEdit,
      webConfig,
      changeLanguages,
      selectionLanguage,
      classification,
      addClassification,
      sortClassification,
      updateClassification,
      removeClassification,
      article,
      changeArticle,
      saveArticle,
      publishArticle,
      restore,
      isUploadDisplay,
      uploadDisplay,
      editorLanguages
    };
  }
)
@observer
class Toolbar extends React.Component<IToolbarProps, IToolbarState> {
  public state = {
    visible: false
  };

  public changeLanguages = (value: SelectValue) => {
    this.props.changeLanguages(value as string);
  };

  public onChangeEditor = (e: RadioChangeEvent) => {
    this.props.changeEdit(e.target.value);
  };

  public openClassificationModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  public onChangeClassification = (value: SelectValue) => {
    this.props.changeArticle({ className: value as string });
  };

  // public onChangeTime = (date: Moment, dateString: string) => {
  //   this.props.changeArticle({ time: dateString });
  // };

  public restore = () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      okType: 'danger',
      cancelText: 'no',
      onOk: async () => {
        this.props.restore();
      }
    });
  };

  public saveArticle = () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      cancelText: 'no',
      onOk: async () => {
        this.props.saveArticle();
      }
    });
  };

  public publishArticle = () => {
    Modal.confirm({
      title: 'Warning',
      content: 'Bla bla ...',
      okText: 'ok',
      cancelText: 'no',
      onOk: async () => {
        this.props.publishArticle();
      }
    });
  };

  public render() {
    return (
      <div className={this.props.className}>
        <ActionGroup direction="right">
          <ActionItem>
            <RadioGroup onChange={this.onChangeEditor} defaultValue={this.props.selectionEdit}>
              <RadioButton value="Monaco">Monaco</RadioButton>
              <RadioButton value="CodeMirror">CodeMirror</RadioButton>
            </RadioGroup>
          </ActionItem>

          <ActionItem>
            <Select
              showSearch
              defaultValue={this.props.selectionLanguage}
              style={{ width: 120 }}
              placeholder="Select a language"
              onChange={this.changeLanguages}
            >
              {this.props.editorLanguages.map((i, idx) => (
                <Option key={idx} value={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </ActionItem>
        </ActionGroup>

        <div className="article_action__grow">
          <ActionGroup direction="right">
            <ActionLine border="1px solid #eee" height="40" />
            <ActionItem>
              <Select
                showSearch
                style={{ width: 130 }}
                placeholder="classification"
                value={this.props.article.className}
                onChange={this.onChangeClassification}
              >
                {this.props.classification.map((i, idx) => (
                  <Option key={idx} value={i._id}>
                    {i.name}
                  </Option>
                ))}
              </Select>
            </ActionItem>
            <ActionItem>
              <Button type="primary" ghost onClick={this.openClassificationModal}>
                Edit
              </Button>
            </ActionItem>
          </ActionGroup>

          <ActionGroup direction="right">
            <ActionLine border="1px solid #eee" spacing="10" height="32" />
            {/* <ActionItem>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Time"
                value={moment(this.props.article.time)}
                onChange={this.onChangeTime}
              />
            </ActionItem> */}
            <ActionItem>
              <Button
                type={this.props.isUploadDisplay ? 'danger' : 'primary'}
                icon="upload"
                ghost
                onClick={() => this.props.uploadDisplay()}
              />
            </ActionItem>
          </ActionGroup>
        </div>

        <ActionGroup direction="left">
          <ActionItem>
            <Button type="danger" icon="delete" onClick={this.restore} />
          </ActionItem>
          <ActionItem>
            <Button onClick={this.saveArticle} icon={this.props.article.isEdit ? 'edit' : ''}>
              Save
            </Button>
          </ActionItem>
          <ActionItem>
            <Button type="primary" onClick={this.publishArticle} icon={this.props.article.isEdit ? 'edit' : ''}>
              Publish
            </Button>
          </ActionItem>
        </ActionGroup>

        <ClassificationModal
          visible={this.state.visible}
          classification={this.props.classification}
          onClassificationModal={this.openClassificationModal}
          sortClassification={this.props.sortClassification}
          addClassification={this.props.addClassification}
          updateClassification={this.props.updateClassification}
          removeClassification={this.props.removeClassification}
        />
      </div>
    );
  }
}

export default styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .article_action__grow {
    flex-grow: 1;
    display: flex;
  }
`;