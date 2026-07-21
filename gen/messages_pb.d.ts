// package: christiangeorgelucas.emoji_tools
// file: messages.proto

import * as jspb from "google-protobuf";

export class EmojiText extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiText.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiText): EmojiText.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiText, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiText;
  static deserializeBinaryFromReader(message: EmojiText, reader: jspb.BinaryReader): EmojiText;
}

export namespace EmojiText {
  export type AsObject = {
    text: string,
  }
}

export class EmojiTextResult extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiTextResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiTextResult): EmojiTextResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiTextResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiTextResult;
  static deserializeBinaryFromReader(message: EmojiTextResult, reader: jspb.BinaryReader): EmojiTextResult;
}

export namespace EmojiTextResult {
  export type AsObject = {
    text: string,
    error: string,
  }
}

export class EmojiContainsResult extends jspb.Message {
  getContainsEmoji(): boolean;
  setContainsEmoji(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiContainsResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiContainsResult): EmojiContainsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiContainsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiContainsResult;
  static deserializeBinaryFromReader(message: EmojiContainsResult, reader: jspb.BinaryReader): EmojiContainsResult;
}

export namespace EmojiContainsResult {
  export type AsObject = {
    containsEmoji: boolean,
    error: string,
  }
}

export class EmojiCountResult extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiCountResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiCountResult): EmojiCountResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiCountResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiCountResult;
  static deserializeBinaryFromReader(message: EmojiCountResult, reader: jspb.BinaryReader): EmojiCountResult;
}

export namespace EmojiCountResult {
  export type AsObject = {
    count: number,
    error: string,
  }
}

export class EmojiMatch extends jspb.Message {
  getEmoji(): string;
  setEmoji(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string;
  setName(value: string): void;

  getStartIndex(): number;
  setStartIndex(value: number): void;

  getEndIndex(): number;
  setEndIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiMatch.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiMatch): EmojiMatch.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiMatch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiMatch;
  static deserializeBinaryFromReader(message: EmojiMatch, reader: jspb.BinaryReader): EmojiMatch;
}

export namespace EmojiMatch {
  export type AsObject = {
    emoji: string,
    name: string,
    startIndex: number,
    endIndex: number,
  }
}

export class EmojiExtractResult extends jspb.Message {
  clearMatchesList(): void;
  getMatchesList(): Array<EmojiMatch>;
  setMatchesList(value: Array<EmojiMatch>): void;
  addMatches(value?: EmojiMatch, index?: number): EmojiMatch;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiExtractResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiExtractResult): EmojiExtractResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiExtractResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiExtractResult;
  static deserializeBinaryFromReader(message: EmojiExtractResult, reader: jspb.BinaryReader): EmojiExtractResult;
}

export namespace EmojiExtractResult {
  export type AsObject = {
    matchesList: Array<EmojiMatch.AsObject>,
    error: string,
  }
}

export class EmojiReplaceRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  hasPlaceholder(): boolean;
  clearPlaceholder(): void;
  getPlaceholder(): string;
  setPlaceholder(value: string): void;

  hasWithName(): boolean;
  clearWithName(): void;
  getWithName(): boolean;
  setWithName(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiReplaceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiReplaceRequest): EmojiReplaceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiReplaceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiReplaceRequest;
  static deserializeBinaryFromReader(message: EmojiReplaceRequest, reader: jspb.BinaryReader): EmojiReplaceRequest;
}

export namespace EmojiReplaceRequest {
  export type AsObject = {
    text: string,
    placeholder: string,
    withName: boolean,
  }
}

export class EmojiGraphemeResult extends jspb.Message {
  clearClustersList(): void;
  getClustersList(): Array<string>;
  setClustersList(value: Array<string>): void;
  addClusters(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiGraphemeResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiGraphemeResult): EmojiGraphemeResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiGraphemeResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiGraphemeResult;
  static deserializeBinaryFromReader(message: EmojiGraphemeResult, reader: jspb.BinaryReader): EmojiGraphemeResult;
}

export namespace EmojiGraphemeResult {
  export type AsObject = {
    clustersList: Array<string>,
    error: string,
  }
}

export class EmojiToken extends jspb.Message {
  getEmoji(): string;
  setEmoji(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiToken.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiToken): EmojiToken.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiToken, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiToken;
  static deserializeBinaryFromReader(message: EmojiToken, reader: jspb.BinaryReader): EmojiToken;
}

export namespace EmojiToken {
  export type AsObject = {
    emoji: string,
  }
}

export class EmojiNameResult extends jspb.Message {
  hasName(): boolean;
  clearName(): void;
  getName(): string;
  setName(value: string): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiNameResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiNameResult): EmojiNameResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiNameResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiNameResult;
  static deserializeBinaryFromReader(message: EmojiNameResult, reader: jspb.BinaryReader): EmojiNameResult;
}

export namespace EmojiNameResult {
  export type AsObject = {
    name: string,
    found: boolean,
    error: string,
  }
}

export class EmojiName extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiName.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiName): EmojiName.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiName, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiName;
  static deserializeBinaryFromReader(message: EmojiName, reader: jspb.BinaryReader): EmojiName;
}

export namespace EmojiName {
  export type AsObject = {
    name: string,
  }
}

export class EmojiLookupResult extends jspb.Message {
  hasEmoji(): boolean;
  clearEmoji(): void;
  getEmoji(): string;
  setEmoji(value: string): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiLookupResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiLookupResult): EmojiLookupResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiLookupResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiLookupResult;
  static deserializeBinaryFromReader(message: EmojiLookupResult, reader: jspb.BinaryReader): EmojiLookupResult;
}

export namespace EmojiLookupResult {
  export type AsObject = {
    emoji: string,
    found: boolean,
    error: string,
  }
}

export class EmojiSearchRequest extends jspb.Message {
  getKeyword(): string;
  setKeyword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiSearchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiSearchRequest): EmojiSearchRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiSearchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiSearchRequest;
  static deserializeBinaryFromReader(message: EmojiSearchRequest, reader: jspb.BinaryReader): EmojiSearchRequest;
}

export namespace EmojiSearchRequest {
  export type AsObject = {
    keyword: string,
  }
}

export class EmojiNameEmojiPair extends jspb.Message {
  getEmoji(): string;
  setEmoji(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiNameEmojiPair.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiNameEmojiPair): EmojiNameEmojiPair.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiNameEmojiPair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiNameEmojiPair;
  static deserializeBinaryFromReader(message: EmojiNameEmojiPair, reader: jspb.BinaryReader): EmojiNameEmojiPair;
}

export namespace EmojiNameEmojiPair {
  export type AsObject = {
    emoji: string,
    name: string,
  }
}

export class EmojiSearchResult extends jspb.Message {
  clearResultsList(): void;
  getResultsList(): Array<EmojiNameEmojiPair>;
  setResultsList(value: Array<EmojiNameEmojiPair>): void;
  addResults(value?: EmojiNameEmojiPair, index?: number): EmojiNameEmojiPair;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiSearchResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiSearchResult): EmojiSearchResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiSearchResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiSearchResult;
  static deserializeBinaryFromReader(message: EmojiSearchResult, reader: jspb.BinaryReader): EmojiSearchResult;
}

export namespace EmojiSearchResult {
  export type AsObject = {
    resultsList: Array<EmojiNameEmojiPair.AsObject>,
    error: string,
  }
}

export class EmojiAnalysis extends jspb.Message {
  getIsEmoji(): boolean;
  setIsEmoji(value: boolean): void;

  clearCodePointsList(): void;
  getCodePointsList(): Array<string>;
  setCodePointsList(value: Array<string>): void;
  addCodePoints(value: string, index?: number): string;

  getIsZwjSequence(): boolean;
  setIsZwjSequence(value: boolean): void;

  getHasSkinToneModifier(): boolean;
  setHasSkinToneModifier(value: boolean): void;

  hasSkinTone(): boolean;
  clearSkinTone(): void;
  getSkinTone(): string;
  setSkinTone(value: string): void;

  getIsRegionalIndicatorFlag(): boolean;
  setIsRegionalIndicatorFlag(value: boolean): void;

  hasCountryCode(): boolean;
  clearCountryCode(): void;
  getCountryCode(): string;
  setCountryCode(value: string): void;

  hasName(): boolean;
  clearName(): void;
  getName(): string;
  setName(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiAnalysis.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiAnalysis): EmojiAnalysis.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiAnalysis, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiAnalysis;
  static deserializeBinaryFromReader(message: EmojiAnalysis, reader: jspb.BinaryReader): EmojiAnalysis;
}

export namespace EmojiAnalysis {
  export type AsObject = {
    isEmoji: boolean,
    codePointsList: Array<string>,
    isZwjSequence: boolean,
    hasSkinToneModifier: boolean,
    skinTone: string,
    isRegionalIndicatorFlag: boolean,
    countryCode: string,
    name: string,
    error: string,
  }
}

export class EmojiSkinToneRequest extends jspb.Message {
  getEmoji(): string;
  setEmoji(value: string): void;

  getTone(): string;
  setTone(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiSkinToneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiSkinToneRequest): EmojiSkinToneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiSkinToneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiSkinToneRequest;
  static deserializeBinaryFromReader(message: EmojiSkinToneRequest, reader: jspb.BinaryReader): EmojiSkinToneRequest;
}

export namespace EmojiSkinToneRequest {
  export type AsObject = {
    emoji: string,
    tone: string,
  }
}

export class EmojiFlag extends jspb.Message {
  getEmoji(): string;
  setEmoji(value: string): void;

  getCountryCode(): string;
  setCountryCode(value: string): void;

  getStartIndex(): number;
  setStartIndex(value: number): void;

  getEndIndex(): number;
  setEndIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiFlag.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiFlag): EmojiFlag.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiFlag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiFlag;
  static deserializeBinaryFromReader(message: EmojiFlag, reader: jspb.BinaryReader): EmojiFlag;
}

export namespace EmojiFlag {
  export type AsObject = {
    emoji: string,
    countryCode: string,
    startIndex: number,
    endIndex: number,
  }
}

export class EmojiFlagResult extends jspb.Message {
  clearFlagsList(): void;
  getFlagsList(): Array<EmojiFlag>;
  setFlagsList(value: Array<EmojiFlag>): void;
  addFlags(value?: EmojiFlag, index?: number): EmojiFlag;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmojiFlagResult.AsObject;
  static toObject(includeInstance: boolean, msg: EmojiFlagResult): EmojiFlagResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmojiFlagResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmojiFlagResult;
  static deserializeBinaryFromReader(message: EmojiFlagResult, reader: jspb.BinaryReader): EmojiFlagResult;
}

export namespace EmojiFlagResult {
  export type AsObject = {
    flagsList: Array<EmojiFlag.AsObject>,
    error: string,
  }
}

