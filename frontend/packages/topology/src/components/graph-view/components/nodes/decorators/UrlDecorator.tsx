import * as React from 'react';
import { Tooltip, TooltipPosition } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { Node } from '@patternfly/react-topology';
import { useTranslation } from 'react-i18next';
import { ROUTE_URL_ANNOTATION, ROUTE_DISABLED_ANNOTATION } from '../../../../../const';
import { useRoutesURL } from '../../../../../data-transforms/useRoutesURL';
import { getResource } from '../../../../../utils';
import Decorator from './Decorator';

interface DefaultDecoratorProps {
  element: Node;
  radius: number;
  x: number;
  y: number;
}

const UrlDecorator: React.FC<DefaultDecoratorProps> = ({ element, radius, x, y }) => {
  const { t } = useTranslation();
  const resourceObj = getResource(element);
  const url = useRoutesURL(resourceObj);
  const routeURL = resourceObj?.metadata?.annotations?.[ROUTE_URL_ANNOTATION];
  const disabledRoute = resourceObj?.metadata?.annotations?.[ROUTE_DISABLED_ANNOTATION];
  const decoratorURL = routeURL || url;

  if (!url || disabledRoute === 'true') {
    return null;
  }
  const label = t('topology~Open URL');
  return (
    <Tooltip key="route" content={label} position={TooltipPosition.right}>
      <Decorator x={x} y={y} radius={radius} href={decoratorURL} external ariaLabel={label}>
        <g transform={`translate(-${radius / 2}, -${radius / 2})`}>
          <ExternalLinkAltIcon style={{ fontSize: radius }} title={label} />
        </g>
      </Decorator>
    </Tooltip>
  );
};

export default UrlDecorator;
